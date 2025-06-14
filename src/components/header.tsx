"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const linkData = [
  {name: "Perfomance", href: "/perfomance"},
  {name: "Reliability", href: "/reliability"},
  {name: "Scale", href: "/scale"},
];

const accessLink = linkData.map(link => link.href);
accessLink.push("/");

export default function Header() {
  const pathname = usePathname();

  if (!accessLink.includes(pathname)) {
    return null;
  }

  return (
    <nav className="absolute w-full z-10">
      <div className="flex justify-between container mx-auto text-white p-8 links-center">
        <Link className="text-3xl font-bold" href="/">
          Home
        </Link>

        <div className="text-xl space-x-5">

          {linkData.map((link) => (
            <Link
              key={link.href}
              className={pathname === link.href ? "text-red-500 active" : ""}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
