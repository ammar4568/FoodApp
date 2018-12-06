const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: true }));

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

const APP_NAME = 'Food App';



/* 
app.get('/', (req, res) => res.status(200).send('Sample Get'));
app.post('/', (req, res) => res.status(200).send('Sample Response'));


exports.sendMail = functions.https.onRequest(app);
 */
exports.sendMail = functions.https.onRequest((req, res) => {
    // ...
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const message = req.body.message;

    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        const mailOptions = {
            // from: `${APP_NAME} <noreply@firebase.com>`,
            from: 'ammarprojects96@gmail.com',
            to: email,
        };

        mailOptions.text = `From ${firstname} ${lastname}. Email: ${email}. Message: ${message}`;


        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(info);
            }
        })
    })


    /* const mailOptions = {
        // from: `${APP_NAME} <noreply@firebase.com>`,
        from: 'ammarprojects96@gmail.com',
        to: email,
    };

    mailOptions.text = `From ${firstname} ${lastname}. Email: ${email}. Message: ${message}`;

    mailTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(info);
        }
    }) */

    // res.status(200).send(`Firstname: ${firstname}, 
    // Lastname: ${lastname}, 
    // Email: ${email}, 
    // Message: ${message}`);
});
