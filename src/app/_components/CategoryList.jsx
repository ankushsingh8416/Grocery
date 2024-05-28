import Link from "next/link";
import Image from "next/image";
import React from "react";

const CategoryList = ({ CategoryLists }) => {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 text-2xl font-bold">Shop by Category</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-5">
        {CategoryLists.map((category, index) => (
          <Link key={"index"}
            href={"/products-category/" + category.attributes.name}
            className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200"
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                category?.attributes?.icon?.data[0]?.attributes?.url
              }
              width={50}
              height={50}
              alt="icon"
              key={index}
              className="group-hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-sm md:text-lg text-green-800" key={index}>
              {category?.attributes?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
