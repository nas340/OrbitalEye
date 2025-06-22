import { Router } from 'express';
import dummyRoute from './routes';

const router = Router();

router.use('/', dummyRoute);

export default router;