const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

//GET tasks
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

//GET tasks/:id
router.get('/tasks/:id', async (req, res) => {
  console.log(req.params);
  const { id: _id } = req.params;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send('no task');
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
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

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
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description' ];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;