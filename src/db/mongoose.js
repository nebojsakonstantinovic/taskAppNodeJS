const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const User = mongoose.model('User', {
//   name: {
//     type: 'String',
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: 'String',
//     required: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('Email is invalid');
//       }
//     },
//     trim: true,
//     lowercase: true,
//   },
//   password: {
//     type: 'String',
//     required: true,
//     trim: true,
//     minlength: 6,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Password cannot contain password');
//       }
//     },
//   },
//   age: {
//     type: 'Number',
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Age must be positive number');
//       }
//     },
//   },
// });

// const me = new User({
//   name: '   Pax    ',
//   email: ' pax@gmail.com     ',
//   password: '123456',
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(err => {
//     console.log(err);
// });

// const Task = mongoose.model('Task', {
//   description: {
//     type: 'String',
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: 'Boolean',
//     default: false,
//   },
// });

// const task = new Task({
//   description: 'Learn french',
//   completed: false,
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch(err => {
//     console.log(err);
//   });
