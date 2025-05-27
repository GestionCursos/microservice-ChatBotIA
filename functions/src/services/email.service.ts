import nodemailer from "nodemailer";
import {EmailDTO} from "../DTO/email.dto";
/**
 * Servicio para enviar correos electrónicos usando nodemailer.
 */
export class EmailService {
  static cuenta = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_CORREO,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
    /**
     * Envía un correo electrónico utilizando los datos del DTO.
     * @param {EmailDTO} emailDTO Objec que contiene la información del correo.
     * @return {Promise<boolean>} `true` si el correo fue enviado, `false`.
     */
  static async sendEmail(emailDTO: EmailDTO): Promise<boolean> {
    emailDTO.from = "gestioinplus@gmail.com";

    if (!emailDTO.subject || !emailDTO.text || !emailDTO.to) {
      return false;
    }

    try {
      await this.cuenta.sendMail(emailDTO);
      return true;
    } catch (error) {
      console.error("Error en EmailService.sendEmail:", error);
      return false;
    }
  }
}
