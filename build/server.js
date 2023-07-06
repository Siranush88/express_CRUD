import express from 'express';
import usersRouter from './routs/users.router.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/users', usersRouter);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
