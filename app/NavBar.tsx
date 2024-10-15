'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();
  return (
    <nav className="flex space-x-5 border-b p-5 items-center bg-gradient-to-r from-black to-blue-500 ">
      <Link href="/">
        <FaBug className="size-10 text-red-600" />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className={
                `${link.href === currentPath ? "text-white" : "text-zinc-400"}
              transition-colors text-xl hover:text-white`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
