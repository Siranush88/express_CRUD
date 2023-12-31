import express, { Router } from 'express';
import { apiKeyValidator } from '../services/users.service.js';
import {getAllUsersController, getUserController, createNewUserController, updateUserController, deleteUserController} from '../controllers/users.controller.js';

const usersRouter:Router = express.Router();

usersRouter.get('/', apiKeyValidator, getAllUsersController);
usersRouter.get('/:id', apiKeyValidator, getUserController);
usersRouter.post('/', apiKeyValidator, createNewUserController);
usersRouter.delete('/:id', apiKeyValidator, deleteUserController);
usersRouter.put('/:id', apiKeyValidator, updateUserController);

export default usersRouter;



