import { consultaEventosDisponibles } from "./courseService";


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