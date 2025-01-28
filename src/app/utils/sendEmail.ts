import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: "sksf212@gmail.com",
      pass: "wruh cadx pdul drda",
    },
  });

  await transporter.sendMail({
    from: "sksf212@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your password within 10 mins!",
    text: "Hello world?", // plain text body
    html: `<div><p><strong>Your Reset Link:</strong> <a href=${html}>Click here</a></p></div>`,
  });
};
