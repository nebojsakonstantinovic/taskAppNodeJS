const { calcTip, celToFar, farToCelsius, add } = require('../src/math');

test('Test calcTip', () => {
  const total = calcTip(10, 0.3);

  expect(total).toBe(13);

});

test('Test calcTip2', () => {
  const total = calcTip(10);

  expect(total).toBe(12.5);

});

test('celToFar', () => {
  const total = celToFar(0);

  expect(total).toBe(32);

});

test('farToCelsius', () => {
  const total = farToCelsius(32);

  expect(total).toBe(0);

});

// test('Async test demo', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000)
// })

test('add test', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test('add test async/await', async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});