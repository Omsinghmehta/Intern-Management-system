import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or smtp like: host: "smtp.mailtrap.io"
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password or smtp password
      },
    });

    await transporter.sendMail({
      from: `"InternSphere" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
