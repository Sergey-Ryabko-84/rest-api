// const sgMail = require("@sendgrid/mail");
// const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = (data) => {
//   const email = { ...data, from: process.env.SENDGRID_EMAIL };
//   sgMail
//     .send(email)
//     .then(() => console.log("the mail was sent successfully"))
//     .catch((error) => console.log(error));
//   console.log("email send");
//   return true;
// };

const nodemailer = require("nodemailer");
require("dotenv").config();

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "serhii.ryabko@meta.ua",
    pass: "Ajax543540",
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "serhii.ryabko@meta.ua" };
  transport
    .sendMail(email)
    .then(() => console.log("the mail was sent successfully"))
    .catch((error) => console.log(error.response));
  return true;
};

module.exports = sendEmail;
