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
import { consultaEventosDisponibles } from './services/courseService';

export const helloWorld = functions.https.onRequest(async (request, response) => {
    response.send("¡Hola mundo desde Firebase!");
    const eventos = await consultaEventosDisponibles();
    console.log(eventos);
});
