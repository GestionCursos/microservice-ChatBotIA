import axios, {isAxiosError} from "axios";
import {consultaEventosDisponibles} from "./courseService";

export const generatedContent = async (promptData: string) => {
  const prompt = await buildPrompt(promptData);
  try {
    const response = await axios.post(
      process.env.IA_URL || "",
      {
        model: process.env.IA_MODELO,
        messages: [{

          role: process.env.IA_CONECTION_ROLE,
          content: prompt,
        },
        ],
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.IA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error:unknown) {
    if (isAxiosError(error)) {
      console.error(
        "Error de llamada a la API:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      console.error("Error de llamada a la API:", error.message);
    } else {
      console.error("Error de llamada a la API:", error);
    }
    throw new Error("Fallo la generacion del articulo con IA");
  }
};

// Función para obtener todos los cursos y su información
const eventosDisponibles = async (): Promise<string> => {
  const cursosDisponibles = await consultaEventosDisponibles();
  let cursosMensaje = "";

  // Recorremos los cursos y concatenamos toda la información de cada uno
  cursosDisponibles.forEach((curso: {
    nombre: string,
    tipo_evento: string,
    fecha_inicio: string,
    fecha_fin: string,
    costo: number,
    categoria: string,
    modalidad: string,
    descripcion: string,
    organizador_nombre: string
  }) => {
    cursosMensaje += `
        Curso: ${curso.nombre},Tipo de evento: 
        ${curso.tipo_evento},Fecha de inicio:` +
      ` ${curso.fecha_inicio},Fecha de fin: 
        ${curso.fecha_fin},Costo: $${curso.costo},` +
      `Categoría: ${curso.categoria},Modalidad: 
      ${curso.modalidad},Descripción:` +
      ` ${curso.descripcion},Organizador: 
        `;
  });
  return cursosMensaje;
};

const buildPrompt = async (promptData: string) => {
  const eventos = await eventosDisponibles();
  return `la plataforma dispone de esta lista de cursos:
        ${eventos}
        y el usuario me a preguntado o dicho:
        ${promptData}
        Dame una respuesta clara, en lenguaje natural, 
        mencionando solo lo relacionado con ${promptData}. 
        Indica toda la informacion necesaria al respecto. 
        adicional a esto recuerda que soy uina plataforma 
        que brinda cursos de diferentes tipos a usuarios 
        asi que si la pregunta es fuera de este dale una 
        respuesta corta recordandole que estas para ayudar 
        con informacion de cursos. todas las respuestas 
        que envies debe ser en texto plano solo con letras 
        sin simbolos o caracteres ten en mente que tu eres 
        la plataforma o una persona que la administra.
        redacta el mensaje adecuadamente como un vendedor 
    `;
};
