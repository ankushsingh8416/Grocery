import React from "react";
import ProductItem from "./ProductItem";

const Products = ({ ProductList }) => {
  return (
    <div className="mt-10">
    <h2 className="text-green-600 text-2xl font-bold">
      Our Popular Products
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
      {ProductList.map((product, index) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  </div>
  );
};

export default Products;
