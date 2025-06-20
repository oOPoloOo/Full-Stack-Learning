import { Router } from 'express';

import * as SessionsController from '../controllers/sessionsController.js';


const router = Router();

// returns all sessions
router.get('', SessionsController.returnAllSessions);

// return specific sessions by id
router.get('/:id', SessionsController.returnSessionById);

// create new sessions
router.post('/', SessionsController.createNewSession);

// deletes session by id
router.delete('/:id', SessionsController.deleteSessionById);

export default router;