const express = require('express');
require('./db/mongoose');
// const User = require('./models/user');
// const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
  // const taskId = '5d56b5a85e8a6d0edcaa344f';
  // const task = await Task.findById('5d56b5a85e8a6d0edcaa344f');
  // await task.populate('owner').execPopulate();
  // console.log(task.owner);

  const user = await User.findById('5d568eaac99ba01b3c637cec');
  await user.populate('tasks').execPopulate();

  console.log(user.tasks);
}

main();