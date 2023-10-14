import nodemailer from "nodemailer";
async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SENDEMAIL,
      pass: process.env.PASS_SENDEMAIL,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Ahmad DREDi 👻" <${process.env.SENDEMAIL}`, // sender address
    to, // list of receivers//becase key=value تكتب واحدة فقط
    subject, // Subject line
    // plain text body
    html, // html body
  });
}
export default sendEmail;
