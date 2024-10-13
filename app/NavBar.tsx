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
    <nav className="flex space-x-5 border-b p-5 items-center">
      <Link href="/">
        <FaBug className="size-10" />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className={
                `${link.href === currentPath ? "text-zinc-800" : "text-zinc-400"}
              transition-colors text-xl`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
