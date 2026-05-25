"use client";

import { assets } from "@/assets/assets";
import {
  HomeIcon,
  ShieldCheckIcon,
  StoreIcon,
  TicketPercentIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Stores", href: "/admin/stores", icon: StoreIcon },
    { name: "Approve Store", href: "/admin/approve", icon: ShieldCheckIcon },
    { name: "Coupons", href: "/admin/coupons", icon: TicketPercentIcon },
  ];

  return (
    <div className="inline-flex flex-col gap-5 border-slate-200 border-r sm:min-w-60 h-full">
      <div className="max-sm:hidden flex flex-col justify-center items-center gap-3 pt-8">
        <Image
          className="rounded-full w-14 h-14"
          src={assets.gs_logo}
          alt=""
          width={80}
          height={80}
        />
        <p className="text-slate-700">Hi, GreatStack</p>
      </div>

      <div className="max-sm:mt-6">
        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${pathname === link.href && "bg-slate-100 sm:text-slate-600"}`}
          >
            <link.icon size={18} className="sm:ml-5" />
            <p className="max-sm:hidden">{link.name}</p>
            {pathname === link.href && (
              <span className="top-1.5 right-0 bottom-1.5 absolute bg-green-500 rounded-l w-1 sm:w-1.5"></span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
