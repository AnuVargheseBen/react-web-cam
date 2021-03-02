export { }
const nodemailer = require("nodemailer");
const { promisifyFun } = require("./helper");


async function sendEmail(subject: string, text: string, attachments: []) {
  const {
    SMTP_USERNAME,
    SMTP_PASSWORD,
    SMTP_HOST,
    SMTP_SECURE,
    SMTP_PORT,
    SMTP_TO,
  } = process.env;

  const isSecure = SMTP_SECURE?.toUpperCase() === "TRUE" ? true : false;
  const smtpPort = parseInt(SMTP_PORT ? SMTP_PORT : '465', 10);

  const mailOptions = {
    from: SMTP_USERNAME,
    to: SMTP_TO,
    subject,
    text,
    attachments,
  };

  const mail = nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });



  const unBoundSendMail = mail.sendMail;
  const sendMail = unBoundSendMail.bind(mail);
  const mailPromise = await promisifyFun(sendMail, mailOptions);
}

module.exports = sendEmail;
