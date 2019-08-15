const express = require('express');
require('./db/mongoose');
// const User = require('./models/user');
// const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// user routes
app.use(userRouter);

// task routes
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
