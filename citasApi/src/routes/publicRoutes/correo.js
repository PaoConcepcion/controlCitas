const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const qr = require('qr-image');
var QRCode = require('qrcode')

router.get('/qrcode', (req, res) => {
	const url  = 'valorqr';
	const code = qr.image(url, {type : 'svg'});
	res.type('svg');
	code.pipe(res);
});


router.post('/send-email', async (req, res) => {
    const { nombre, correo, telefono, id_cita, fecha, hora, servicio, costo, empleado, sucursal } = req.body;

    // let img = await QRCode.toDataURL('Hola');
    let img = await QRCode.toDataURL(`
        Nombre: ${nombre} 
        Correo electrónico: ${correo} 
        Teléfono: ${telefono} 
        ID de la cita: ${id_cita}
        Servicio: ${servicio} 
        Fecha y hora de la cita: ${fecha} a las ${hora} 
        Sucursal: ${sucursal} 
        Empleado: ${empleado} 
        Costo: ${costo} 
    `); 

    // console.log(`${img}`);
    contentHTML = `
        <h1>Información del usuario</h1> 
        <ul>
            <li>Nombre: ${nombre} </li>
            <li>Correo electrónico: ${correo} </li>
            <li>Teléfono: ${telefono} </li>
            <li>ID de la cita: ${id_cita}</li>
            <li>Servicio: ${servicio} 
            <li>Fecha y hora de la cita: ${fecha} a las ${hora} </li>
            <li>Sucursal: ${sucursal} </li>
            <li>Empleado: ${empleado} </li>
            <li>Costo: ${costo} </li>
        </ul>
        <img src="${img}">
        <p>Te esperamos!!</p>
    `;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "aheredam@gmail.com ",
          pass: "gdvrgdxfuwmvhusq",
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: "ControlCitas",
        to: `${correo}`,
        subject: "Datos de tu cita",
        attachDataUrls: true,
        html: contentHTML
    });

    res.json({success: 'true'});
});

module.exports = router;