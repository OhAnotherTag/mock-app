export function getUserCart(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (userId === '1234') {
        resolve([
          {
            id: '900db19c-97e4-42ac-95c8-f87685badc60',
            qty: 1,
          },
          {
            id: '9514bc7f-70ef-4f33-9fba-6bc29f0dd944',
            qty: 2,
          },
        ]);
      } else {
        reject([]);
      }
    }, 100);
  });
}
