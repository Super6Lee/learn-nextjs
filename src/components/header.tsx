"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="absolute w-full z-10">
      <div className="flex justify-between container mx-auto text-white p-8 items-center">
        <Link className="text-3xl font-bold" href="/">
          Home
        </Link>

        <div className="text-xl space-x-5">
          <Link
            className={pathname === "/perfomance" ? "text-red-500 active" : ""}
            href="/perfomance"
          >
            Perfomance
          </Link>
          <Link
            className={pathname === "/reliability" ? "text-red-500 active" : ""}
            href="/reliability"
          >
            Reliability
          </Link>
          <Link
            className={pathname === "/scale" ? "text-red-500 active" : ""}
            href="/scale"
          >
            Scale
          </Link>
        </div>
      </div>
    </nav>
  );
}
