import { Request, Response } from 'express';
import {getUsers,getUser,createNewUser,updateUser,deleteUser,apiKeyValidator} from '../services/users.service.js';

export const getAllUsersController = async (req: Request,res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    if (!users) {
      res.status(404).json({ error: 'Users are not found' });
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserController = async (req: Request,res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const user = await getUser(userId);
    if (!user) {
      res.status(404).json({ error: 'User is not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNewUserController = async (req: Request,res: Response): Promise<void> => {
  try {
    const newUser = {
      id: req.body.id,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      status: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };

    await createNewUser(newUser);
    res.status(201).json({ message: 'New user is created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new user' });
  }
};

export const updateUserController = async (req: Request,res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const updatedUser = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    };

    const user = await updateUser(userId, updatedUser);
    if (!user) {
      res.status(404).json({ error: 'User is not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    await deleteUser(userId);
    res.json({ message: 'User is deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

