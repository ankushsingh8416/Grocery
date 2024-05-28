import React from "react";
import Link from "next/link";
import Image from "next/image";
const TopCategoryList = ({ CategoryLists, selectedCategory }) => {
  return (
    <div className="flex gap-5 mt-5 overflow-auto mx-7 md:mx-20 justify-center">
      {CategoryLists.map((category, index) => (
        <Link
          href={"/products-category/" + category.attributes.name}
          className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px] ${selectedCategory==category.attributes.name&&'bg-green-600 text-white'}`}
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
          <h2 className={`text-sm md:text-lg text-green-800
          ${selectedCategory==category.attributes.name&&' text-white'}
          `} key={index}>
            {category?.attributes?.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
