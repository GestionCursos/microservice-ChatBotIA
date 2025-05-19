import * as functions from 'firebase-functions';
import { generatedContent } from './services/ia-service';
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';

const ttsClient = new TextToSpeechClient();

export const cursosDisponibles = functions.https.onRequest(async (request, response) => {

    try {
        const { mensaje } = request.body; // 👈 Aquí accedes al contenido del body

        if (!mensaje) {
            response.status(400).json({ error: 'Mensaje requerido' });
            return;
        }

        const resultado = await generatedContent(mensaje);
        console.log(resultado);

        const ttsRequest = {
            input: { text: resultado },
            voice: { languageCode: 'es-ES', ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.FEMALE },
            audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3 },
        };

        const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);
        if (!ttsResponse.audioContent) {
            throw new Error('No se pudo generar el audio');
        }

        response.setHeader('Content-Type', 'audio/mpeg');
        response.setHeader('Content-Disposition', 'attachment; filename=respuesta.mp3');
        response.send(ttsResponse.audioContent);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});
