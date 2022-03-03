const nodemailer = require("nodemailer");

const mailSender = async (options, redirectLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const message = {
    from: '"Assignment" <leasonwetech66@gmail.com', // sender address
    to: options.email, // email receivers
    subject: process.env.subject, // Subject line
    text: `please click to this link to confirm you account ${redirectLink}`,
  };
  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};
module.exports = mailSender;
