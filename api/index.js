const express = require('express');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const Client = require('twilio')(accountSid, authToken);

const app = express();

const sendMessage = () => {
  Client.messages
  .create({
    body: 'Alguém apertou a campainha!',
    from: process.env.TWILIO_SENDER_NUMBER,
    to: process.env.RECIPIENT_NUMBER
  })
  .then(messages => console.log(messages.sid))
  .catch(messages => console.log(messages.error_code + ' : ' + messages.error_message))
}

app.use('/sms', (req, res) => {
  sendMessage();
});

app.listen(8080, () => {
  console.log('Express server listening on port 8080');
});