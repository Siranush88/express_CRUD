var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile, writeFile } from 'fs/promises';
const KEY = 'a11';
const apiKeyValidator = (req, res, next) => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersData = yield readFile('./users.json');
    return JSON.parse(usersData.toString());
});
const saveUsers = (users) => __awaiter(void 0, void 0, void 0, function* () {
    yield writeFile('users.json', JSON.stringify(users, null, 2));
});
function getAllUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield getUsers();
        if (!users) {
            res.status(404).json({ error: 'Users are not found' });
        }
        res.json(users);
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield getUsers();
        const user = users.find((user) => user.id == Number(req.params.id));
        if (!user) {
            res.status(404).json({ error: 'User is not found' });
        }
        res.json(user);
    });
}
function createNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield getUsers();
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
            yield saveUsers(users);
            res.status(201).json({ message: 'New user is created successfully' });
        }
        catch (_a) {
            res.status(400).json({ error: 'Failed to create a new user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield getUsers();
        const user = users.find((user) => user.id == Number(req.params.id));
        if (!user) {
            res.status(404).json({ error: 'User is not found' });
        }
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        user.gender = req.body.gender || user.gender;
        user.status = true;
        user.updated = new Date().toISOString();
        yield saveUsers(users);
        res.json(user);
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield getUsers();
        const index = users.findIndex((user) => user.id == Number(req.params.id));
        if (index === -1) {
            res.status(404).json({ error: 'User is not found' });
        }
        users.splice(index, 1);
        yield saveUsers(users);
        res.json(users);
    });
}
export { getAllUsers, getUser, createNewUser, updateUser, deleteUser, apiKeyValidator };
// npm start
