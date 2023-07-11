import { readFile, writeFile } from 'fs/promises';
import {NextFunction, Request, Response} from 'express';
import { IUser } from './serviceTypes/servicesTypes.js';

const KEY = 'a11';

const apiKeyValidator = (req:Request, res:Response, next:NextFunction):void | Response => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

const getUsers = async ():Promise<any> => {
    const usersData = await readFile('./users.json');
    return JSON.parse(usersData.toString());
};

const saveUsers = async (users:IUser[]):Promise<void> => {
    await writeFile('users.json', JSON.stringify(users, null, 2));
}

async function getAllUsers(_req:Request, res:Response):Promise<void> {
    const users = await getUsers();
    if (!users) {
        res.status(404).json({ error: 'Users are not found' });
    }
    res.json(users);
}

async function getUser(req:Request, res:Response):Promise<void> {
    const users:IUser[] = await getUsers();
    const user:IUser = users.find((user) => user.id == Number(req.params.id))!;
    if (!user) {
        res.status(404).json({ error: 'User is not found' });
    }
    res.json(user);
}

async function createNewUser(req:Request, res:Response):Promise<void> {
    try{
        const users:IUser[] = await getUsers();

        const newUser:IUser = {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            status: false,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
        };

        users.push(newUser);
        await saveUsers(users);
        res.status(201).json({ message: 'New user is created successfully' });
    } catch {
        res.status(400).json({ error: 'Failed to create a new user' });
    }
}

async function updateUser(req:Request, res:Response):Promise<void> {
    const users:IUser[] = await getUsers();
    const user:IUser = users.find((user) => user.id == Number(req.params.id))!;

    if (!user) {
        res.status(404).json({ error: 'User is not found' });
    }
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.status = true;
    user.updated = new Date().toISOString();

    await saveUsers(users);
    res.json(user);
}


async function deleteUser(req:Request, res:Response):Promise<void> {
    const users:IUser[] = await getUsers();
    const index:number = users.findIndex((user) => user.id == Number(req.params.id));
    if (index === -1) {
        res.status(404).json({ error: 'User is not found' });
    }
    users.splice(index, 1);

    await saveUsers(users);
    res.json(users);
}



export {
    getAllUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
    apiKeyValidator
}
