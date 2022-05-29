require("dotenv").config();
const express = require("express");
const app = express();

// Twilio connection
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Client = require("twilio")(accountSid, authToken);

const sendMessage = () => {
  Client.messages
    .create({
      body: "Alguém apertou a campainha!",
      from: process.env.TWILIO_SENDER_NUMBER,
      to: process.env.RECIPIENT_NUMBER,
    })
    .then((messages) =>
      messages.errorCode
        ? console.log(`${messages.errorCode} - ${messages.errorMessage}`)
        : console.log(`sid: ${messages.sid}`)
    )
    .catch((error) => console.log(`${error}`));
};

app.use("/sms", (req, res) => {
  
  sendMessage();
  res.json({status: 'success'})
  res.end(); //encerrar requisição
});

app.get('/', (req,res) => {
  res.send('Connection successfuly')
})

app.listen(8080, () => {
  console.log("Express server listening on port 8080");
});
