const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET request are disabled');
//   } else {
//     next();
//   }
// });

// maintenance mode
// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.status(503).send('Site under maintenance');
//   }
// });

app.use(express.json());

// user routes
app.use(userRouter);

// task routes
app.use(taskRouter);

module.exports = app;