"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import userAuthUser from "../../utils/hooks";

export default function Topnav() {
  const { user } = userAuthUser();

  return (
    <nav className="flex flex-col gap-4 px-10 mobile:px-4 py-5">
      <ul className="flex gap-4 self-end text-xs">
        <li>Help</li>
        <li>Orders & Returns</li>
        {user && <li>Hi, {user.name.split(" ")[0]}</li>}
      </ul>

      <div className="jus flex items-center justify-between">
        <p className="logo text-3xl mobile:text-2xl font-bold">
          <Link href={"#"}>ECOMMERCE</Link>
        </p>

        <ul className="tabs flex gap-8 font-semibold lg:hidden mr-28 ">
          <Link className="hover:underline" href={"#"}>
            Categories
          </Link>
          <Link className="hover:underline" href={"#"}>
            Sale
          </Link>
          <Link className="hover:underline" href={"#"}>
            Clearance
          </Link>
          <Link className="hover:underline" href={"#"}>
            New stock
          </Link>
          <Link className="hover:underline" href={"#"}>
            Trending
          </Link>
        </ul>

        <div className="action flex gap-5">
          <Link href={"#"}>
            <Image
              src="/icons/search.svg"
              alt="search"
              width={35}
              height={35}
            />
          </Link>
          <Link href={"#"}>
            <Image src="/icons/cart.svg" alt="cart" width={35} height={35} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
