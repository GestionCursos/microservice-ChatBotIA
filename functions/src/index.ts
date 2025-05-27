import express from "express";
import * as functions from "firebase-functions";

import {generatedContent} from "./services/ia-service";
import {TextToSpeechClient, protos} from "@google-cloud/text-to-speech";
import {EmailDTO} from "./DTO/email.dto";
import {EmailService} from "./services/email.service";
const ttsClient = new TextToSpeechClient();
const app = express();
app.use(express.json());

/**
 * Endpoint para obtener cursos disponibles generados por IA
 * y retornar un archivo de audio (MP3) usando Text-to-Speech.
 */
app.post("/cursosDisponibles",
  async (request, response) => {
    try {
      const {mensaje} = request.body;
      if (!mensaje) {
        response.status(400).json({error: "Mensaje requerido"});
        return;
      }
      const resultado = await generatedContent(mensaje);
      const ttsRequest = {
        input: {text: resultado},
        voice: {
          languageCode: "es-ES",
          ssmlGender:
            protos.google.cloud.texttospeech.v1.SsmlVoiceGender.FEMALE,
        },
        audioConfig: {
          audioEncoding:
            protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
        },
      };
      const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);
      if (!ttsResponse.audioContent) {
        throw new Error("No se pudo generar el audio");
      }
      response.setHeader("Content-Type", "audio/mpeg");
      response.setHeader(
        "Content-Disposition",
        "attachment; filename=respuesta.mp3");
      response.send(ttsResponse.audioContent);
    } catch (error) {
      console.error(error);
      response.status(500).json({error: "Error interno del servidor"});
    }
  });

/**
* Endpoint para enviar un correo electrónico usando EmailService.
*/
app.post("/enviarCorreo", async (request, response) => {
  try {
    const emailDTO: EmailDTO = request.body;

    if (!emailDTO) {
      response.status(400).json({error: "Mensaje requerido"});
      return;
    }

    const enviado = await EmailService.sendEmail(emailDTO);

    if (!enviado) {
      response.status(500).json({error: "Error enviando correo"});
      return;
    }

    response.status(200).json({message: "Correo enviado correctamente"});
  } catch (error) {
    console.error("Error enviando correo:", error);
    if (!response.headersSent) {
      response.status(500).json({error: "Error interno del servidor"});
    }
  }
});

export const api = functions.https.onRequest(app);
