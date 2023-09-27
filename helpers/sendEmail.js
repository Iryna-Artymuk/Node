// -------nodeMail imap-----

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const { EMAIL_FROM, EMAIL_PASSWORD } = process.env;
console.log('EMAIL_PASSWORD : ', EMAIL_PASSWORD);
console.log('EMAIL_FROM: ', EMAIL_FROM);

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD,
  },
});

// const data= {
//     from: EMAIL_FROM, // sender address
//     to: ' irynaartymuk@gmail.com', // list of receivers
//     subject: 'Hello from Node.js ', // Subject line
//     text: ' Test email', // plain text body
//     html: '<b>Hello world?</b>  <h1> Test email from GoIT Node.js </h1> <p> Nodemailer - це єдиний модуль з нульовими залежностями для Node.js, призначений для надсилання електронних листів. Його основні функції включають (але не обмежуються ними) незалежність від платформи безпека, зокрема, доставка електронної пошти з TLS/STARTTLS та DKIM автентифікацією електронної пошти Підтримка Unicode HTML-контент та вкладені зображенн різні транспортні методи, крім підтримки SMTP. </p>', // html body
//   }

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(data) {
  // send mail with defined transport object

  try {
    const email = await transporter.sendMail({
      ...data,
      from: EMAIL_FROM, // sender address
    });

    console.log('Message sent: %s');
    return email;
  } catch (error) {
    console.log('error: ', error);
  }
}

export default sendEmail;
