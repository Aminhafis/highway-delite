import { Router } from 'express';
import { validatePromo } from '../controllers/promoController.js';

const router = Router();

router.post('/validate', validatePromo);
export default router;
