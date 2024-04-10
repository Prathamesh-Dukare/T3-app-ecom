import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="bg-lightBg">
      <p className="flex text-sm justify-center items-center gap-5 py-3">
        <span>
          <Image
            src="/icons/left_arrow.svg"
            alt="cart"
            width={15}
            height={18}
          />
        </span>
        Get 10% off on business sign up
        <span>
          <Image
            src="/icons/right_arrow.svg"
            alt="cart"
            width={15}
            height={18}
          />
        </span>
      </p>
    </div>
  );
}
