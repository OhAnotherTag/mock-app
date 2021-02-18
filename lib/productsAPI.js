import items from './products';

function getRecentProducts() {
  return new Promise((res) => {
    setTimeout(() => res(items.slice(0, 3)), 100);
  });
}

function getAllProducts() {
  return new Promise((res) => {
    setTimeout(() => res(items), 100);
  });
}

function getAllProductsId() {
  return new Promise((res) => {
    setTimeout(() => {
      let allIds = items.map((i) => i.id);
      res(allIds);
    }, 100);
  });
}

function getProductById(id) {
  return new Promise((res) => {
    setTimeout(() => {
      let item = items.find((i) => i.id === id);
      res(item);
    }, 100);
  });
}

function searchProducts(param) {
  return new Promise((res) => {
    setTimeout(() => {
      const pattern = new RegExp(`^${param}`, 'gi');
      let filteredItems = items.filter((item) => item.name.match(pattern));

      res(filteredItems);
    }, 500);
  });
}

function getProductsFromCart(products) {
  return new Promise((res) => {
    setTimeout(() => {
      const cart = [];

      for (let product of products) {
        console.log(product)
        let cartItem = items.find((item) => item.id === product.id);

        cart.push({ ...cartItem, ...product });
      }

      res(cart);
    }, 500);
  });
}

export {
  items,
  getAllProducts,
  getAllProductsId,
  getProductById,
  getRecentProducts,
  searchProducts,
  getProductsFromCart,
};
