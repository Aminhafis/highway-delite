import { Router } from 'express';
import { getExperiences, getExperienceById } from '../controllers/experienceController.js';

const router = Router();

router.get('/', getExperiences);
router.get('/:id', getExperienceById);
export default router;
