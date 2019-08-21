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

const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('File must be a Word document'));
    }
    cb(undefined, true);
  },
});


app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});


app.use(express.json());

// user routes
app.use(userRouter);

// task routes
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
