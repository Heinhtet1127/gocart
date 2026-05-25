"use client";
import Link from "next/link";

const StoreNavbar = () => {
  return (
    <div className="flex justify-between items-center px-12 py-3 border-slate-200 border-b transition-all">
      <Link href="/" className="relative font-semibold text-slate-700 text-4xl">
        <span className="text-green-600">go</span>cart
        <span className="text-green-600 text-5xl leading-0">.</span>
        <p className="-top-1 -right-11 absolute flex items-center gap-2 bg-green-500 p-0.5 px-3 rounded-full font-semibold text-white text-xs">
          Store
        </p>
      </Link>
      <div className="flex items-center gap-3">
        <p>Hi, Seller</p>
      </div>
    </div>
  );
};

export default StoreNavbar;
