import { Router } from 'express';

import * as UsersController from '../controllers/usersController.js';
import {  login, register, loginAuto } from '../controllers/authController.js';
// TODO: add authentication when middleware finished 
// TODO: allow acces only to admin
import { checkJWT, verifyAdmin } from '../middleware/webToken.js';


const router = Router();

// returns all users
router.get('', UsersController.returnAllUsers);

// return specific user by id
router.get('/:id', UsersController.returnUserById);

// delete user by id
router.delete('/:id', UsersController.deleteUserById);

// logIn user if exists in database
router.post('/login', login);

// register new user
router.post('/register', register);

//verify if admin is trying to get access to information
router.get('/isAdmin', checkJWT, verifyAdmin, (req, res) => {
  res.sendStatus(200);
});

//  login with JWT - login automatically if user has valid JWT
router.get('/loginAuto', loginAuto);

export default router;