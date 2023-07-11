import express from 'express';
import { getAllUsers, getUser, createNewUser, deleteUser, updateUser, apiKeyValidator } from '../services/users.service.js';
const usersRouter = express.Router();
usersRouter.get('/', apiKeyValidator, getAllUsers);
usersRouter.get('/:id', apiKeyValidator, getUser);
usersRouter.post('/', apiKeyValidator, createNewUser);
usersRouter.delete('/:id', apiKeyValidator, deleteUser);
usersRouter.put('/:id', apiKeyValidator, updateUser);
export default usersRouter;
