import axios from "axios";
import { consultaEventosDisponibles } from "./courseService";

export const generatedContent = async (promptData: string) => {
    const prompt = buildPrompt(promptData);
    try {
        const response = await axios.post(
            process.env.IA_URL || "",
            {
                model: process.env.IA_MODELO,
                messages: [{

                    role: process.env.IA_CONECTION_ROLE,
                    content: prompt
                }
                ]
            }, {
            headers: {
                Authorization: `Bearer ${process.env.IA_API_KEY}`,
                'Content-Type': 'application/json',
            }
        }
        );
        return response.data.choices[0].message.content;

    } catch (error) {
        if (error instanceof Error) {
            console.error(
                'Error de llamada a la API:',
                (error as any).response?.data || error.message,
            );
        } else {
            console.error('Error de llamada a la API:', error);
        }
        throw new Error('Fallo la generacion del articulo con IA');
    }
}

const eventosDisponibles = async () => {
    return await consultaEventosDisponibles();
}

const buildPrompt = (promptData: string) => {
    return `tenbgo la siguiente lista de cursos:
        ${eventosDisponibles}
        y el usuario me a preguntado o dicho:
        ${promptData}
        Dame una respuesta clara, en lenguaje natural, 
        mencionando solo lo relacionado con ${promptData}. 
        Indica toda la informacion necesaria al respecto. 
        adicional a esto recuerda que soy uina plataforma 
        que brinda cursos de diferentes tipos a usuarios 
        asi que si la pregunta es fuera de este dale una 
        respuesta corta recordandole que estas para ayudar 
        con informacion de cursos
    `;
}