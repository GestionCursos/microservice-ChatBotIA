/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//import { onRequest } from "firebase-functions/v2/https"; descomentar
//import * as logger from "firebase-functions/logger";  descomentar

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from 'firebase-functions';
import { generatedContent } from './services/ia-service';

export const cursosDisponibles = functions.https.onRequest(async (request, response) => {

    try {
        const { mensaje } = request.body; // 👈 Aquí accedes al contenido del body

        if (!mensaje) {
            response.status(400).json({ error: 'Mensaje requerido' });
            return ;
        }

        const resultado = await generatedContent(mensaje);
        console.log(resultado);

        response.status(200).json({ respuesta: resultado });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
}
);
