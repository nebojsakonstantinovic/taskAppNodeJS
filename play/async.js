const add = (a,b) => {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('numbers must be non-negative')
      }
      resolve(a + b)
    }, 2000)
  })
}

const doWork = async () => {
  const sum = await add(-1, 400);
  const sum2 = await add(sum, 400);
  const sum3 = await add(sum2, sum);
  return sum3;
}

// console.log(doWork());

doWork().then((result) => {
  console.log('result', result);
}).catch((err) => {
  console.log(err);
});


