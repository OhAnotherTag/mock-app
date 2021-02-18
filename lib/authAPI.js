export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (username === 'test' && password === '123') {
        resolve('1234');
      } else {
        reject('Wrong Username/Password');
      }
    }, 1000);
  });
}