import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
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
            className="text-zinc-400 hover:text-zinc-800 transition-colors text-xl"
          >
            {" "}
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
