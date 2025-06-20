import { Router } from 'express';

import * as UsersController from '../controllers/usersController.js';


const router = Router();

// returns all users
router.get('', UsersController.returnAllUsers);

// return specific user by id
router.get('/:id', UsersController.returnUserById);

export default router;