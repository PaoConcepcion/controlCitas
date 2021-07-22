const express = require("express");
const router = express.Router();
const getDay = require("date-fns/getDay");

// Para el chatbot
const { WebhookClient } = require("dialogflow-fulfillment");

const axios = require("axios");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

const dias = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo'];

router.post("/webhook", express.json(), function (req, res) {
  const agent = new WebhookClient({ request: req, response: res });

  // console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  // console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // Registrar datos en la tabla "usuarios"
  async function crearUsuario(agent) {
    let id_usuario = 0;
    let nombre = agent.parameters["nombre"];
    let apellido_paterno = agent.parameters["apellido_paterno"];
    let apellido_materno = agent.parameters["apellido_materno"];
    let correo = agent.parameters["correo"];
    let telefono = agent.parameters["telefono"];

    let fecha = agent.parameters["fecha"];
    let hora = agent.parameters["hora"];

    let busqueda = agent.parameters["typeService"];
    let respuesta = await axios.get(
      "https://controlcitas-bc.herokuapp.com/api/service-name/" + busqueda
    );
    if (respuesta.data !== "") {
      let id_servicio = respuesta.data.id_servicio;
      let service = await axios.get("https://controlcitas-bc.herokuapp.com/api/services/" + id_servicio);

      let fechaCita = fecha.split("T", 1)[0];
      let hora_entrada = hora.split("T", 2)[1].split("-", 1)[0];

      let horaSalida = hora_entrada.split(':',2);
      horaSalida[1] = Number(horaSalida[1]);

      let band = true;
      let duracion = Number(service.data.duracion);

      while (band) {
        horaSalida[1] += duracion;
        if (horaSalida[1] >= 60) {
          duracion = horaSalida[1] - 60;
          horaSalida[0] = Number(horaSalida[0]) + 1;
          horaSalida[1] = 0;
        } else {
          band = false;
        }
      }

      if (horaSalida[1] < 10) horaSalida[1] = '0' + horaSalida[1];
      if (horaSalida[0] < 10) horaSalida[0] = '0' + horaSalida[0];
      horaSalida = (horaSalida[0] + ':' + horaSalida[1] + ':00');
      console.log(horaSalida);

      const diaSemana = dias[getDay(new Date(fechaCita))];
      console.log(diaSemana);

      let empleados_servicios = await axios.get(`https://controlcitas-bc.herokuapp.com/api/employees_available/${diaSemana}/${id_servicio}/1`);
      console.log(empleados_servicios.data);

      let usuarioNuevo = await axios.post("https://controlcitas-bc.herokuapp.com/api/users", {
        id_usuario,
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        telefono
      });

      let citanueva = await axios.post("https://controlcitas-bc.herokuapp.com/api/dates", {
        id_cita: 0,
        id_empleado_servicio: empleados_servicios.data[0].id_empleado_servicio,
        fecha: fechaCita,
        hora_entrada: hora_entrada,
        hora_salida: horaSalida,
        id_usuario: usuarioNuevo.data[0][0].id_usuario,
        costo: service.data.costo
      });

      let enviarCorreo = await axios.post("https://controlcitas-bc.herokuapp.com/api/send-email", {
        nombre: nombre + ' ' + apellido_paterno + ' ' + apellido_materno,
        correo: correo,
        telefono: telefono,
        id_cita: citanueva.data[0][0].id_cita,
        fecha: fechaCita,
        hora: hora_entrada + '-' + horaSalida,
        servicio: service.data.nombre,
        costo: service.data.costo,
        empleado:  empleados_servicios.data[0].nombre,
        sucursal:  'sucursal'
      });

      agent.add("Se han registrado su cita")

    } else {
      agent.add("No manejamos un servicio con ese nombre");
      let services = await axios.get("https://controlcitas-bc.herokuapp.com/api/services");
      agent.add("Tenemos los siguientes servicios:");

      for (const o of services.data) {
        agent.add(o.nombre + " con un costo de: $" + o.costo + ".00");
      }
    }

  }

  // Consultar la cita
  async function consultDate(agent) {
    let id_cita = agent.parameters["id_cita"];
    let respuesta = await axios.get(
      "https://controlcitas-bc.herokuapp.com/api/getUserDate/" + id_cita
    );
    // console.log(respuesta.data);
    if (respuesta.data !== "") {
      agent.add("Tu nombre es: " + respuesta.data[0].nombre);
      agent.add("Tu teléfono es: " + respuesta.data[0].telefono);
      agent.add("Tu correo es: " + respuesta.data[0].correo);
      agent.add("La cita será el día " + respuesta.data[0].fecha + " en un horario de: " + respuesta.data[0].hora_entrada + " - " + respuesta.data[0].hora_salida);
      agent.add("Te atenderá: " + respuesta.data[0].empleado + ". Te hará un servicio de " + respuesta.data[0].servicio + " con un costo de $" + respuesta.data[0].costo + ".00");
    } else {
      agent.add("El correo ingresado no está registrado con nosotros");
    } 
  }

  let intentMap = new Map();
  // Registrar datos en la tabla "usuarios"
  intentMap.set("userInformation", crearUsuario);
  // Consultar la cita
  intentMap.set("consultDate", consultDate);

  intentMap.set("Introduction", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});

module.exports = router;
