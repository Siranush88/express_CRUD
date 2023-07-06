import { readFile, writeFile } from 'fs/promises';

const KEY = 'a11';

const apiKeyValidator = (req, res, next) => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

const getUsers = async () => {
    const usersData = await readFile('./users.json');
    return JSON.parse(usersData);
};

const saveUsers = async (users) => {
    await writeFile('users.json', JSON.stringify(users, null, 2));
}

async function getAllUsers(req, res) {
    const users = await getUsers();
    if (!users) {
        res.status(404).json({ error: 'Users not found' });
    }
    res.json(users);
}

async function getUser(req, res) {
    const users = await getUsers();
    const user = users.find((user) => user.id == req.params.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    res.json(user);

}

async function createNewUser(req, res) {
    try{
        const users = await getUsers();
        const newUser = {
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
        res.status(201).json({ error: 'Created successfully' });
    } catch {
        res.status(400).json({ error: 'Failed to create a new user' });
    }
}

async function updateUser(req, res) {
    const users = await getUsers();
    const user = users.find((user) => user.id == req.params.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.updated = new Date().toISOString();
    await saveUsers(users);
    res.json(user);
}


async function deleteUser(req, res) {
    const users = await getUsers();
    const index = users.findIndex((user) => user.id == req.params.id);
    if (index === -1) {
        res.status(404).json({ error: 'User not found' });
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