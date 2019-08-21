const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

//POST users / create user
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken()
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }

  // user
  //   .save()
  //   .then(() => {
  //     return res.status(201).send(user);
  //   })
  //   .catch(err => {
  //     res.status(400);
  //     res.send(err);
  //   });

  // res.send('test');
});

//POST users/login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }
});

//POST users/logout
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((item) => {
      return item.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST users/logoutAll
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET users/me
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

//GET users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }

  // User.find({}).then(
  //   (users) => {
  //     return res.send(users);
  //   }
  // ).catch(
  //   (err) => {
  //     return res.status(400).send(err);
  //   }
  // );
});

//GET users/:id
router.get('/users/:id', async (req, res) => {
  console.log(req.params);
  const { id: _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send('no user');
    }
    return res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  // User.findById(_id).then(
  //   (user) => {
  //     if (!user) {
  //       return res.status(404).send('no user');
  //     }

  //     return res.send(user);
  //   }
  // ).catch(
  //   (err) => {
  //     return res.status(400).send(err);
  //   }
  // );
});

// update user
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // const user = await User.findById(req.params.id);

    updates.forEach(update => req.user[update] = req.body[update]);

    await req.user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // ignores middleware

    // if (!user) {
    //   return res.status(404).send();
    // }
    return res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
})

// delete user
router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);

    // if (!user) {
    //   return res.status(404).send();
    // }

    await req.user.remove();

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST /users/me/avatar
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File must be a picture'));
    }
    cb(undefined, true);
  },
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

//DELETE /users/me/avatar
router.delete('/users/me/avatar', auth, async (req,res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

//GET /users/:id/avatar
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;