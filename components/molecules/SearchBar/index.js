import React from 'react';
import { useRouter } from 'next/router';

import { searchProducts } from '../../../lib/productsAPI';
import Combobox from '../Combobox/index';

function SearchBar() {
  const router = useRouter();

  async function search(searchParam) {
    let products = await searchProducts(searchParam);
    return products;
  }

  function goToProductPage(product) {
    router.push(`/products/${product.id}`);
  }

  return (
    <Combobox
      searchFn={search}
      shouldAutoSelect={false}
      onItemSelected={goToProductPage}
    />
  );
}

export default SearchBar;
