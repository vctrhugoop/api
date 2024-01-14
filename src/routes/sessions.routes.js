import { Router } from 'express';

import { SessionsController } from '../controllers/SessionsController.js';

const sessionsController = new SessionsController();

const sessionsRouter = Router();

export default sessionsRouter.post('/', sessionsController.create);
