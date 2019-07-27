import { Router } from 'express';
import authRoutes from './auth';

const router = Router();

router.get('/', (req, res) => res.status(200).json('Welcome'));
router.use('/auth', authRoutes);

export default router;
