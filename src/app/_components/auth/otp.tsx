"use client";

import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

export default function Otp() {
  const [otp, setOtp] = useState("1234");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e: any) => {
    setIsSubmitting(true);
    try {
      e.preventDefault();

      // let signUpRithEmailAndPassword(auth, email, password);
      // router.replace("/crosspost");
    } catch (err) {
      console.log(err, "error in signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setError("");
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
        onSubmit={submitHandler}
        className="w-[28rem] md:w-[20rem] mobile:w-full mx-auto mt-7 tab:w-full"
      >
        <div className="sm:text-sm relative">
          <label className="block pt-1.5 relative left-2" htmlFor="email">
            <span>Code</span>
          </label>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            renderInput={(props, index) => (
              <div className="border m-2 md:m-1 mobile:m-[5px] p-3 md:p-2 mobile:p-[5px] rounded-md">
                <input key={index} {...props} />
              </div>
            )}
          />
        </div>

        {error && <p className="pt-3.5 text-center text-red-400">{error}</p>}

        <button
          disabled={isSubmitting}
          className={`w-full text-white mt-8 rounded-md bg-primary hover:bg-gray-600 ${
            isSubmitting && "bg-gray-600"
          }`}
          type="submit"
        >
          <span className="block w-full py-3">VERIFY</span>
        </button>
      </form>
    </div>
  );
}
