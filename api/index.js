const express = require('express');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const Client = require('twilio')(accountSid, authToken);

const app = express();

const sendMessage = () => {
    Client.messages
    .create({
       body: 'Alguém apertou a campainha!',
       from: '+18508096690',
       to: '+5554996266120'
     })
    .then(message => console.log(message.sid));
}

app.use('/sms', (req, res) => {
  sendMessage();
});

app.listen(8080, () => {
  console.log('Express server listening on port 1337');
});