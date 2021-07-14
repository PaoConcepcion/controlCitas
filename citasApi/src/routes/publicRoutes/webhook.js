const express = require("express");
const router = express.Router();

// Para el chatbot
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const {
  dialogflow,
  SimpleResponse,
  BasicCard,
  Button,
  Image,
  BrowseCarousel,
  BrowseCarouselItem,
  Suggestions,
  LinkOutSuggestion,
  MediaObject,
  Table,
  List,
  Carousel,
} = require('actions-on-google');
const app = dialogflow({debug: true});

const axios = require("axios");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

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

  function crearUsuario(agent) {
    let id_usuario = 0;
    let nombre = agent.parameters["nombre"];
    let apellido_paterno = agent.parameters["apellido_paterno"];
    let apellido_materno = agent.parameters["apellido_materno"];
    let correo = agent.parameters["correo"];
    let telefono = agent.parameters["telefono"];

    axios.post("https://controlcitas-bc.herokuapp.com/api/users", {
      id_usuario,
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      telefono,
    });

    const msg = {
      to: correo,
      from: "rodritj01@gmail.com",
      templateId: "d-a11ea03ff6df49eabc32f830aeb6cb03",
      dynamic_template_data: {
        nombre,
        apellido_paterno,
        apellido_materno,
        telefono,
      },
    };
    sgMail.send(msg);

    agent.add(
      "El usuario: " +
        nombre +
        " " +
        apellido_paterno +
        " fue registrado en la base de datos"
    );
  }

  async function consultDate(agent) {
    let correo = agent.parameters["correo"];
    let respuesta = await axios.get(
      "https://controlcitas-bc.herokuapp.com/api/users_email/" + correo
    );
    if (respuesta.data !== "") {
      agent.add(
        "Tu nombre es: " +
          respuesta.data.nombre +
          " " +
          respuesta.data.apellido_paterno
      );
      agent.add("Tu teléfono es: " + respuesta.data.telefono);
    } else {
      agent.add("El correo que colocaste no está registrado con nosotros");

      // agent.add(new Card({
      //   title: 'Prueba',
      //   imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
      //   text: `This is the body text of a card.  You can even use line\n  breaks and emoji!`,
      //   buttonText: 'Se rendre sur XXX',
      //   buttonUrl: 'https://XXX/'
      //   })
      // );

      // app.intent('Basic Card', (conv) => {
      
      //   conv.ask(`Here's an example of a basic card.`);
      //   conv.ask(new BasicCard({
      //     text: `This is a basic card.  Text in a basic card can include "quotes" and
      //     most other unicode characters including emojis.  Basic cards also support
      //     some markdown formatting like *emphasis* or _italics_, **strong** or
      //     __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
      //     things like line  \nbreaks`, // Note the two spaces before '\n' required for
      //                                  // a line break to be rendered in the card.
      //     subtitle: 'This is a subtitle',
      //     title: 'Title: this is a title',
      //     buttons: new Button({
      //       title: 'This is a button',
      //       url: 'https://assistant.google.com/',
      //     }),
      //     image: new Image({
      //       url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
      //       alt: 'Image alternate text',
      //     })
      //   }));
      //   conv.ask('Which response would you like to see next?');
      // });

    }
  }

  let intentMap = new Map();
  intentMap.set("userInformation", crearUsuario);
  intentMap.set("consultDate", consultDate);
  intentMap.set("Introduction", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});

module.exports = router;
