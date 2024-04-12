import { mailTransport } from "../config/mail";
import { env } from "../env";

async function sendOtpMail(otp: number, toMail: string) {
  const sendRes = await mailTransport.sendMail({
    from: `Prathamesh Dukare <${env.SMTP_SENDER_EMAIL}>`,
    to: toMail,
    subject: "OTP for Ecommerce App",
    text: `
        Your OTP is ${otp}. Please do not share it with anyone.
    `,
  });

  console.log("sendRes", sendRes);
}

async function sendWelcomeEmail(toName: string, toMail: string) {
  const sendRes = mailTransport.sendMail({
    from: env.SMTP_SENDER_EMAIL,
    to: toMail,
    subject: "Welcome to Ecommerce App",
    text: `
      Welcome ${toName},
      
      We are glad to have you on board. Looking forward to serving you.
      `,
  });

  console.log("sendRes", sendRes);
}

export { sendOtpMail, sendWelcomeEmail };
