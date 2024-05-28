import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import Products from "@/app/_components/Products";

async function ProductCategory({ params }) {
  const ProductList = await GlobalApi.getProductsByCategory(params?.categoryName);
  const CategoryLists = await GlobalApi.getCategoryList()

  return (
    <div>
      <h2 className="p-4 bg-primary text-center text-white font-bold text-3xl">
        {params.categoryName}
      </h2>
      <TopCategoryList CategoryLists={CategoryLists} selectedCategory={params.categoryName} />
      <div className="p-5 md:p-10">
        <Products ProductList={ProductList} />
      </div>
    </div>
  );
}

export default ProductCategory;
