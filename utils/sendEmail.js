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
