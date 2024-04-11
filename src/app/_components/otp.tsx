"use client";

import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "sonner";
import { api } from "../../trpc/react";
import { useRouter } from "next/navigation";

export interface OtpProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
}

export default function Otp({ formData }: OtpProps) {
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const submitOtp = api.user.verifyOtp.useMutation({
    onSuccess(data) {
      console.log(data, "data");
      toast.success("OTP verified successfully");
      // set token in cookie
      document.cookie = `authToken=${data.token}; path=/`;
      router.push("/");
    },

    onError(err) {
      console.log(err, "error");
      toast.error(err.message);
    },
  });

  const otpSubmitHandler = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitOtp.mutate({
      email: formData.email,
      otp: otp,
    });
  };

  // Preventing user from leaving the page
  useEffect(() => {
    window.onbeforeunload = function () {
      return "";
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  // clear the state
  useEffect(() => {
    setIsSubmitting(false);
  }, [otp]);

  return (
    <div className="otp border border-borderClr w-fit mx-auto px-12 py-14 mt-10 mobile:px-5  rounded-xl overflow-hidden">
      <h1 className="text-center text-[32px] sm:text-2xl font-semibold">
        Verify your email
      </h1>

      <div className="text-center">
        <p className="mt-4">Enter the 8 digit code you have received on </p>
        <p className="email font-semibold">{"pahesfjn@f.com"}</p>
      </div>

      <form
        onSubmit={otpSubmitHandler}
        className="w-[28rem] md:w-[20rem] mobile:w-full mx-auto mt-7 tab:w-full"
      >
        <div className="sm:text-sm relative">
          <label className="block pt-1.5 relative left-2" htmlFor="email">
            <span>Code</span>
          </label>

          <OtpInput
            value={otp}
            onChange={setOtp}
            inputType="number"
            numInputs={8}
            renderInput={(props, index) => (
              <div className="border m-2 md:m-1 mobile:m-[5px] p-3 md:p-2 mobile:p-[5px] rounded-md outline-none">
                <input minLength={1} required key={index} {...props} />
              </div>
            )}
          />
        </div>

        <button
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "opacity-50 w-full text-white mt-3 rounded-md bg-primary hover:bg-gray-6"
              : `w-full text-white mt-3 rounded-md bg-primary hover:bg-gray-600`
          }
          type="submit"
        >
          <span className="block w-full py-3">VERIFY</span>
        </button>
      </form>
    </div>
  );
}
