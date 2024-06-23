"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const path = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/dashboard/users", label: "Users" },
    { href: "/admin/dashboard/products", label: "Products" },
    { href: "/admin/dashboard/reviews", label: "Reviews" },
    { href: "/admin/dashboard/orders", label: "Orders" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">Admin Panel</div>
      <nav className="flex-1">
        <ul>
          {links.map((link) => (
            <li
              key={link.href}
              className={`p-4 hover:bg-gray-700 ${
                path === link.href ? "bg-gray-700" : ""
              }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
