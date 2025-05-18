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
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes';
import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("¡Hola mundo desde Firebase!");
});
dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api/courses', courseRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola Mundo desde Express con TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
