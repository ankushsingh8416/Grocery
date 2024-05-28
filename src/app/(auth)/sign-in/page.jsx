"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const SignIn = () => {
  const router = useRouter();

  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loader, setLoader] = useState();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    setLoader(true)
    GlobalApi.SignIn(email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        router.push("/");
        toast("Login Sucessfully");
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false)

      }
    );
  };
  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Sign In to Account</h2>
        <h2 className="text-gray-500">
          Enter Your Email and Password to Sign In
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="name@example.com"
            onChange={(e) => setemail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button onClick={onSignIn} disabled={!(email || password)}>
          {loader?<LoaderIcon className="animate-spin" />:"Sign In"}
          </Button>
          <p>
            Don't have an account ?
            <Link href={"/create-account"} className="text-blue-500">
              Click here to Create new Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
