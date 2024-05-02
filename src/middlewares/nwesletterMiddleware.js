const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: MAILGUN_API_KEY });

const sendEmail = async (email, userName) => {
  const messageData = {
    from: "soyummynewsletter@gmail.com",
    to: email,
    subject: "So Yummy Newsletter",
    html: `<strong>Hello ${userName} !</strong><br/><br/>
        Thank you for subscribing to our newsletter!<br/>`,
  };

  await client.messages
    .create(MAILGUN_DOMAIN, messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendEmail;
