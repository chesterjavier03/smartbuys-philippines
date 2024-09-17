'use client';

import { useEffect, useState } from 'react';
import Products from '@/components/products/products';
import SearchInput from '@/components/products/search-input';
import { Product } from '@prisma/client';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    if (!filterValue) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          product.category.toLowerCase().includes(filterValue.toLowerCase()) ||
          product.price.toString().includes(filterValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [filterValue, products]);

  const handleSearch = (query: string) => {
    setFilterValue(query);
  };

  return (
    <div className="">
      <SearchInput onSearch={handleSearch} />
      <Products products={filteredProducts} />
    </div>
  );
};

export default ProductList;
