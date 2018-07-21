'use strict';
 
const functions = require('firebase-functions');
var admin = require("firebase-admin");
var nodemailer = require('nodemailer');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://bmax-4f9dc.firebaseio.com'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    
    console.log("Request Header "+JSON.stringify(request.header));
    console.log("Request Body "+JSON.stringify(request.body));
    
    let action = request.body.result.action;
    const parameters = request.body.result.parameters;
    
    let responseJson = {};
    
    const actionHandlers = {
        
        'SendMail': () => {
            sendMail(parameters);
        }

        
    };
    
    function sendMail(parameters){
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            secure: false,
            port: 587,
            auth: {
                user: '---- your gmail address ----',
                pass: '---- your gmail password ---'
            }
        });
        
        var mailOptions = {
          from: '"Bmax" <kabir3483@gmail.com>',
          to: parameters.email,
          subject: parameters.subject,
          text: parameters.message
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
        responseJson.speech = "I have successfully send the massege";
        response.json(responseJson);
        
    }
    
    console.log('action:', action);
    if (!actionHandlers[action]) {
        action = 'default';
    }
    
    actionHandlers[action]();
    
});





