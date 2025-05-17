import { Request, Response } from "express";

export const getRecommendedCourses = async (req: Request, res: Response) => {
    try {
        const userMessage = req.query.q as string;
        const recommendedCourse = [
            'Curso de Inteligencia Artificial',
            'Curso de Node.js con PostgreSQL',
            'Curso de APIs REST con Express y TypeScript'
        ];
        res.json(recommendedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener recomendaciones' });
    }
}

