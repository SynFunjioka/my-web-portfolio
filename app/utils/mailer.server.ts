import nodemailer from "nodemailer";
import { APP_CONFIG } from "~/config/app.config";

export interface ISendEmailParams {
  name: string;
  subject: string
  email: string;
  message: string;
}

export async function sendEmail({ name, email, subject, message }: ISendEmailParams) {
  const { host, port, secure, user, pass } = APP_CONFIG.smtp;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from   : `"${name}" <${email}>`,
    to     : APP_CONFIG.recipient_email,
    subject: "Solicitud de Cita - María Daniela de la Cruz",
    text   : message,
    html   : `<p>Nombre: ${name}</p><p>Email: ${email}</p><p>Mensaje: ${message}</p>`,
  });
}