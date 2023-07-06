// import { readFile, writeFile } from 'fs/promises';

// const API_KEY = 'a11';

// const responseDetails = (status, message) => {
//     return res.status(status).json(message);
// }


// const apiKeyValidator = (req, res, next) => {
//     const apiKey = req.get('api-key');
//     if (!apiKey || apiKey !== API_KEY) {
//         responseDetails(401, { error: 'Unauthorized' })
//     }
//     next();
// };

// const getUsers = async () => {
//     const usersData = await readFile('./users.json');
//     return JSON.parse(usersData);
// };

// const saveUsers = async (users) => {
//     await writeFile('users.json', JSON.stringify(users, null, 2));
// }

// async function getAllUsers(req, res) {
//     const users = await getUsers();
//     if (!users) {
//         responseDetails(404, { error: 'Users not found' })
//     }
//     res.json(users);
// }

// async function getUser(req, res) {
//     const users = await getUsers();
//     const user = users.find((user) => user.id == req.params.id);
//     if (!user) {
//         responseDetails(404, { error: 'User not found' })
//     }
//     res.json(user);

// }

// async function createNewUser(req, res) {
//     const users = await getUsers(); // error handling stexcel
//     const newUser = {
//         id: req.body.id,
//         name: req.body.name,
//         age: req.body.age,
//         gender: req.body.gender,
//         status: false,
//         created: new Date().toISOString(),
//         updated: new Date().toISOString(),
//     };
//     users.push(newUser);
//     await saveUsers(users);
//     res.json(newUser);
// }

// async function updateUser(req, res) {
//     const users = await getUsers();
//     const user = users.find((user) => user.id == req.params.id);
//     if (!user) {
//         responseDetails(404, { error: 'User not found' })
//     }
//     user.name = req.body.name || user.name;
//     user.age = req.body.age || user.age;
//     user.gender = req.body.gender || user.gender;
//     user.updated = new Date().toISOString();
//     await saveUsers(users);
//     res.json(user);
// }


// async function deleteUser(req, res) {
//     const users = await getUsers();
//     const index = users.findIndex((user) => user.id == req.params.id);
//     if (index === -1) {
//         responseDetails(404, { error: 'User not found' })
//     }
//     users.splice(index, 1);
//     await saveUsers(users);

//     res.sendStatus(201);
// }



// export {
//     getAllUsers,
//     getUser,
//     createNewUser,
//     updateUser,
//     deleteUser,
//     apiKeyValidator
// }