import nodemailer from "nodemailer";
import { env } from "../env";

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: env.SMTP_SENDER_EMAIL,
    pass: env.SMTP_SENDER_PASSWORD,
  },
});

export { mailTransport };
