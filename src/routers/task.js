const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

//GET tasks / ALL
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.find({})
  //   .then(tasks => {
  //     return res.send(tasks);
  //   })
  //   .catch(err => {
  //     return res.status(500).send(err);
  //   });
});

//GET tasks/me?completed=false / for user
// limit skip
// sortBy=createdAt:asc
router.get('/tasks/me', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    }).execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }

});

//GET tasks/:id
router.get('/tasks/:id', auth, async (req, res) => {
  const { id: _id } = req.params;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.findById(_id)
  //   .then(user => {
  //     if (!user) {
  //       return res.status(404).send('no task');
  //     }

  //     return res.send(user);
  //   })
  //   .catch(err => {
  //     return res.status(400).send(err);
  //   });
});

//POST tasks
router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  // task
  //   .save()
  //   .then(() => {
  //     return res.status(201).send(task);
  //   })
  //   .catch(err => {
  //     res.status(400);
  //     res.send(err);
  //   });

  // res.send('test');
});

// update task
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description' ];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => task[update] = req.body[update]);

    await task.save();

    return res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;