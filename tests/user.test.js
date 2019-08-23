const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@test.com',
  password: '123456',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should singup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Ime',
      email: 'test@gmail.com',
      password: '123456',
    })
    .expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    // expect(response.body.user.name).toBe('Ime');
    expect(response.body.user).toMatchObject({
      name: 'Ime',
      email: 'test@gmail.com',
    });

    //Assert that password is not asved in plain text
    expect(user.password).not.toBe('123456');

});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

    // Assertions about token
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);

});

test('Should not login nonexistentuser user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'Pera',
      password: 'Tera',
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauth user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete acc for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    // Assert that user is deleted
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not delete acc for unauth user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

    // check if avatar fieald type is Buffer
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
  await request(app)
  .patch('/users/me')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send({
    name: 'Jazz',
  })
  .expect(200);

  //
  const user =await User.findById(userOneId);
  expect(user.name).toEqual('Jazz');
});

test('Should not update invalid user fields', async () => {
  await request(app)
  .patch('/users/me')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send({
    location: 'BG',
  })
  .expect(400);
});