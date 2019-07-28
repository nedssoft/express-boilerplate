import { Router } from 'express';
import { registerValidationRules, loginValidationRules } from '../../validators/rules/auth';
import validate from '../../validators';
import { register, login } from '../../controllers/auth';

const router = Router();

router.post('/register', registerValidationRules(), validate, register);
router.post('/login', loginValidationRules(), validate, login);

export default router;
