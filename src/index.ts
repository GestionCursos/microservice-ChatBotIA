// src/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes';
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
