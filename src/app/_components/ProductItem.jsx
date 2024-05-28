import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductitemDetail from "./ProductitemDetail";

const ProductItem = ({ product }) => {
  return (
    <>
      <div className="p-2 md:p-6  flex flex-col items-center justify-center gap-2 md:gap-3 border rounded-lg hover:scale-105 cursor-pointer hover:shadow-lg transition-all ease-in-out">
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            product?.attributes?.images?.data[0]?.attributes?.url
          }
          width={500}
          height={200}
          alt={product.attributes.name}
          className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] object-contain"
        />
        <h2 className="font-bold text-sm md:text-lg">
          {product.attributes.Name}
        </h2>
        <div className="flex gap-3">
          {product.attributes.sellingPrice && (
            <h2 className="font-bold text-sm md:text-lg">
              ${product.attributes.sellingPrice}
            </h2>
          )}

          <h2
            className={`font-bold text-sm md:text-lg ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${product.attributes.mrp}
          </h2>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-primary hover:text-white  hover:bg-primary"
            >
              Add To Cart
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
               <ProductitemDetail product={product} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProductItem;
