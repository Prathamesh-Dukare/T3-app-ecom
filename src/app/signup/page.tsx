"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../trpc/react";
import FormInput from "../_components/formInput";
import Otp from "../_components/otp";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isOtpScreen, setIsOtpScreen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createUser = api.user.create.useMutation({
    onSuccess(data, variables, context) {
      console.log(data, "data");
      setIsOtpScreen(true);
      toast("Check your email for OTP");
    },

    onError(err) {
      console.log(err, "error");
      toast.error(err.message);
    },
  });

  // * Create handler
  const signUpHandler = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    createUser.mutate(formData);
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [formData]);

  return isOtpScreen ? (
    <Otp formData={formData} />
  ) : (
    <div className="signup border border-borderClr w-fit mx-auto px-12 py-14 mt-10 rounded-xl">
      <h1 className="text-center text-[32px] sm:text-2xl font-semibold">
        Create your account
      </h1>

      <form
        onSubmit={signUpHandler}
        className="w-[28rem] md:w-[20rem] mobile:w-full flex flex-col gap-7 sm:gap-3 mobile:gap-2 mx-auto mt-7 tab:w-full"
      >
        <FormInput
          id="name"
          name="Name"
          min={5}
          type="text"
          setter={setFormData}
        />
        <FormInput id="email" name="Email" type="email" setter={setFormData} />
        <FormInput
          id="password"
          min={8}
          name="Password"
          type="password"
          setter={setFormData}
        />

        <button
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "opacity-50 w-full text-white mt-3 rounded-md bg-primary hover:bg-gray-6"
              : `w-full text-white mt-3 rounded-md bg-primary hover:bg-gray-600`
          }
          type="submit"
        >
          <span className="block w-full py-3">Create account</span>
        </button>
      </form>

      <p className="login_redirect text-center mt-7">
        <span className="text-lightText">Have an Account?</span>
        <Link className="hover:underline" href={"/login"}>
          &nbsp; LOGIN
        </Link>
      </p>
    </div>
  );
}
