"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormInput from "../_components/formInput";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();

  const signInHandler = async (e: any) => {
    setIsSubmitting(true);
    try {
      e.preventDefault();
      const { email, password } = formData;
    } catch (err) {
      console.log(err, "error in signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login border border-borderClr w-fit mx-auto px-12 py-14 mt-10 rounded-xl">
      <h1 className="text-center text-[32px] sm:text-2xl font-semibold">
        Login
      </h1>
      <div className="text-center">
        <p className="text-2xl py-3">Welcome back to ECOMMERCE</p>
        <p className="text">The next gen business marketplace</p>
      </div>

      <form
        onSubmit={signInHandler}
        className="w-[28rem] md:w-[20rem] mobile:w-full flex flex-col gap-7 sm:gap-3 mobile:gap-2 mx-auto mt-7 tab:w-full"
      >
        <FormInput id="email" name="Email" type="email" setter={setFormData} />
        <FormInput
          id="password"
          name="Password"
          type="password"
          setter={setFormData}
        />

        <button
          disabled={isSubmitting}
          className={`w-full text-white mt-3 rounded-md bg-primary hover:bg-gray-600 ${
            isSubmitting && "bg-gray-600"
          }`}
          type="submit"
        >
          <span className="block w-full py-3">LOGIN</span>
        </button>
      </form>

      <p className="login_redirect text-center mt-7">
        <span className="text-lightText">Don’t have an Account? </span>
        <Link className="hover:underline" href={"/signup"}>
          &nbsp; SIGN UP
        </Link>
      </p>
    </div>
  );
}
