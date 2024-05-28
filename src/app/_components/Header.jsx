"use client";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  LogIn,
  Search,
  CircleUserRound,
  ShoppingBasket,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";

const Header = () => {
  const [CategoryList, setCategoryList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();
  const { updateCart, setupdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  // ============== Add to cart ============

  const getCartItems = async () => {
    if (user) {
      try {
        const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
        setTotalCartItem(cartItemList_.length);
        setCartItemList(cartItemList_);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    }
  };

  useEffect(() => {
    getCartItems();
  }, [user, jwt, updateCart]);

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast("Item Removed");
      getCartItems;
    });
  };

  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total+element.amount;
    });
    setSubTotal(total.toFixed(2))
  }, [cartItemList]);

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Image src="/logo.png" alt="logo" width={150} height={100} />
        <div>
          <DropdownMenu asChild>
            <DropdownMenuTrigger>
              <h2 className="hidden md:flex cursor-pointer gap-2 items-center border rounded-full p-2 px-10 bg-slate-200">
                <LayoutGrid className="h-5 w-5" />
                Category
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CategoryList.map((category, index) => (
                <Link
                  key={index}
                  href={"/products-category/" + category.attributes.name}
                >
                  <DropdownMenuItem
                    key={category.id}
                    className="flex gap-2 items-center"
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                        category?.attributes?.icon?.data[0]?.attributes?.url
                      }
                      alt="icon"
                      width={27}
                      height={27}
                      unoptimized={true}
                    />
                    <h2>{category?.attributes?.name}</h2>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" className="outline-none" placeholder="Search" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center gap-2 text-lg">
              <ShoppingBasket className="h-7 w-7" />
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold p-2">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal <span>${subTotal}</span>
                </h2>
                <Button onClick={()=>router.push(jwt?'/checkout':'sign-in')}>Checkout</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>
              Login <LogIn className="ml-1" />
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="h-12 w-12 p-2 rounded-full bg-green-100 text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My order</DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
