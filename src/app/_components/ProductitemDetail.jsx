"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";
const ProductitemDetail = ({ product }) => {
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );
  const [loading, setLoading] = useState(false);

  // ======================== Add To Cart ====================
  const [quantity, setquantity] = useState(1);
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const {updateCart, setupdateCart}=useContext(UpdateCartContext)
  const router = useRouter();
  const addToCart = () => {
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_user: user.id,
        userid: user.id
      }
    };
    console.log(data);


    GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        console.log(resp);
        toast("Added To Cart");
        setupdateCart(!updateCart)
        setLoading(false);
      },
      (e) => {
        toast("Error while  adding into cart");
        setLoading(false);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={300}
        height={300}
        alt={product.attributes.name}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3 text-left mt-5 md:mt-0">
        <h2 className="font-bold text-sm md:text-2xl">
          {product.attributes.Name}
        </h2>
        <p className="text-sm font-bold text-gray-500">
          {product.attributes.Description}
        </p>
        <div className="flex gap-3 ">
          {product.attributes.sellingPrice && (
            <h2 className="font-bold text-sm text-center md:text-3xl">
              ${product.attributes.sellingPrice}
            </h2>
          )}

          <h2
            className={`font-bold text-sm md:text-3xl ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${product.attributes.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          {product.attributes.itemQuantityType}
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-14 md:gap-10 items-center  px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setquantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setquantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              = ${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button
            className="flex gap-3 w-full md:w-auto"
            onClick={() => addToCart()}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add To Cart"
            )}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category:</span>
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
};

export default ProductitemDetail;
