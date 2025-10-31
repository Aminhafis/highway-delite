import { Router } from 'express';
import { createBooking } from '../controllers/bookingController.js';

const router = Router();

router.post('/', createBooking);
export default router;
