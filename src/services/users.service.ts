import { readFile, writeFile } from 'fs/promises';
import { IUser } from './serviceTypes/servicesTypes.js';
import { NextFunction, Request, Response } from 'express';

const KEY = 'a11';

const apiKeyValidator = (req:Request, res:Response, next:NextFunction):void | Response => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

const getUsers = async (): Promise<IUser[]> => {
  const usersData = await readFile('./users.json');
  return JSON.parse(usersData.toString());
};

const saveUsers = async (users: IUser[]): Promise<void> => {
  await writeFile('users.json', JSON.stringify(users, null, 2));
};

const getUser = async (userId: number): Promise<IUser | undefined> => {
  const users = await getUsers();
  return users.find((user) => user.id === userId);
};

const createNewUser = async (newUser: IUser): Promise<void> => {
  const users = await getUsers();
  users.push(newUser);
  await saveUsers(users);
};

const updateUser = async (userId: number, updatedUser: Partial<IUser>): Promise<IUser | undefined> => {
  const users = await getUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return undefined;
  }

  const user = users[userIndex];
  user.name = updatedUser.name || user.name;
  user.age = updatedUser.age || user.age;
  user.gender = updatedUser.gender || user.gender;
  user.status = true;
  user.updated = new Date().toISOString();

  await saveUsers(users);
  return user;
};

const deleteUser = async (userId: number): Promise<void> => {
  const users = await getUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    await saveUsers(users);
  }
};


export {
    getUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
    apiKeyValidator
}

