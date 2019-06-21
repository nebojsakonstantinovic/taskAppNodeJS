const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const { ObjectID } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'tesk-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.toHexString());
// console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('unable to connect');
    }

    console.log('konektovani');

    const db = client.db(databaseName);

    // db.collection('tasks').findOne(
    //   { _id: new ObjectID('5d037136b6e8aa24ac35f858') },
    //   (error, task) => {
    //     if (error) {
    //       return console.log('unable to fetch user');
    //     }

    //     console.log(task);
    //   }
    // );

    // db.collection('users')
    //   .find({ age: '50' })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log('unable to fetch users');
    //     }

    //     return console.log(users);
    //   });

    // db.collection('users')
    //   .find({ age: '50' })
    //   .count((error, count) => {
    //     if (error) {
    //       return console.log('unable to fetch users');
    //     }

    //     return console.log(count);
    //   });

    // db.collection('users').insertOne(
    //   {
    //     _id: id,
    //     name: 'Visnja',
    //     age: '32',
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log('unable insert user');
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'Mika',
    //       age: 45,
    //     },
    //     {
    //       name: 'Ana',
    //       age: 23,
    //     },
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       return console.log('unable insert users');
    //     }

    //     console.log(result.insertedCount, result.ops);
    //   }
    // );

    // db.collection('tasks').insertMany(
    //   [
    //     {
    //       desc: 'Claen the house',
    //       completed: true,
    //     },
    //     {
    //       name: 'Play with cat',
    //       completed: false,
    //     },
    //     {
    //       name: 'Go to store',
    //       completed: false,
    //     },
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       return console.log('unable insert tasks');
    //     }

    //     console.log(result.insertedCount, result.ops);
    //   }
    // );

    //update

    // const updatePromise = db.collection('users').updateOne(
    //   { _id: new ObjectID('5d036d683172cc22d85c8c12') },
    //   {
    //     $inc: {
    //       age: 4,
    //     },
    //   }
    // );

    // updatePromise
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // db.collection('tasks')
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // delete

    // db.collection('users')
    //   .deleteMany({
    //     age: '50',
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // db.collection('tasks')
    //   .deleteOne({
    //     name: 'Go to store',
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
);
