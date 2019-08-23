const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//   to: 'nebojsa.konstantin@gmail.com',
//   from: 'nebojsa.konstantin@gmail.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'Cao Cao',
// });

const sendWelcomeEmail = (email, name) => {
  // sgMail.send({
  //   to: email,
  //   from: 'pajaPatak@gmail.com',
  //   subject: 'Thanks for joining',
  //   text: `Welcome to the app ${name}`,
  // });
}

const sendCancelationEmail = (email, name) => {
  // sgMail.send({
  //   to: email,
  //   from: 'pajaPatak@gmail.com',
  //   subject: 'Cao Cao',
  //   text: `Acc Deleted ${name}`,
  // });
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
}