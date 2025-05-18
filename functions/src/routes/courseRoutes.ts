import { Router } from "express";
import { getRecommendedCourses } from "../controllers/courseController";

const router=Router();

router.get('/recomendations',getRecommendedCourses);

export default router;
