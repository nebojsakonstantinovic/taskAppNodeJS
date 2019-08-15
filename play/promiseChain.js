require('../src/db/mongoose');
const Task = require("../src/models/task");

// const add = (a,b) => {
//   return new Promise((resolve, reject)=> {
//     setTimeout(() => {
//       resolve(a + b)
//     }, 2000)
//   })
// }

// add(1, 2).then((sum) => {
//   console.log(sum);

//   add(sum, 5).then((sum2) => {
//    console.log(sum2);
//   }).catch((e) => {
//    console.log(err);
//   });
// }).catch((err) => {
//   console.log(err);
// });

// add(1, 2).then((sum) => {
//   console.log(sum);
//   return add(sum, 4)
// }).then((sum2) => {
//   console.log(sum2);
// }).catch((err) => {
//     console.log(err);
//   });

const Id = '5d123e217ea873141c60ef20';

// Task.findByIdAndDelete(Id).then((task) => {
//   console.log(task);
//   return Task.countDocuments({ completed: false })
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deleteTaskAndCount(Id).then((res) => console.log(res)).catch(err => console.log(err));