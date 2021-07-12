// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const axios = require('axios')
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function crearUsuario(agent){
    
    let id_usuario = 0;
  	let nombre = agent.parameters["nombre"];
    let apellido_paterno = agent.parameters["apellido_paterno"];
    let apellido_materno = agent.parameters["apellido_materno"];
    let correo = agent.parameters["correo"];
    let telefono = agent.parameters["telefono"];

    axios.post("https://controlcitas-bc.herokuapp.com/api/users", {id_usuario, nombre, apellido_paterno, apellido_materno, correo, telefono});
    alert("El usuario: " + nombre + " " + apellido_paterno + " fue registrado en la base de datos");
    agent.add("El usuario: " + nombre + " " + apellido_paterno + " fue registrado en la base de datos");
  }
  
  async function consultDate(agent){
  	let correo = agent.parameters["correo"];
    let respuesta = await axios.get('https://controlcitas-bc.herokuapp.com/api/users_email/' + correo);
    if(respuesta.data !== ""){
      agent.add("Tu nombre es: " + respuesta.data.nombre + " " + respuesta.data.apellido_paterno);
      agent.add("Tu teléfono es: " + respuesta.data.telefono);
    }else{
      agent.add("El correo que colocaste no existe");
    }
  }
  
  
let intentMap = new Map();
  intentMap.set('userInformation', crearUsuario);
  intentMap.set('consultDate', consultDate);
  intentMap.set('Introduction', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  agent.handleRequest(intentMap);
});
