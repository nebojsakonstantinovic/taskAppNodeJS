const express = require('express');
require('./db/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//POST users
app.post('/users', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      return res.send(user);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });

  // res.send('test');
});

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
