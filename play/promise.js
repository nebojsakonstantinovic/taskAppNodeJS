require('../src/db/mongoose');
const User = require("../src/models/user");

const Id = '5d07b8e4c6c848311874d670';

// User.findByIdAndUpdate(Id, {age: 10}).then((user) => {
//   console.log(user);
//   return User.countDocuments({ age: 10 })
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
}

updateAgeAndCount(Id, 2)