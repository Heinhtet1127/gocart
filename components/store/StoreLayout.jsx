"use client";
import { dummyStoreData } from "@/assets/assets";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import SellerNavbar from "./StoreNavbar";
import SellerSidebar from "./StoreSidebar";

const StoreLayout = ({ children }) => {
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState(null);

  const fetchIsSeller = async () => {
    setIsSeller(true);
    setStoreInfo(dummyStoreData);
    setLoading(false);
  };

  useEffect(() => {
    fetchIsSeller();
  }, []);

  return loading ? (
    <Loading />
  ) : isSeller ? (
    <div className="flex flex-col h-screen">
      <SellerNavbar />
      <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
        <SellerSidebar storeInfo={storeInfo} />
        <div className="flex-1 p-5 lg:pt-12 lg:pl-12 h-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center px-6 min-h-screen text-center">
      <h1 className="font-semibold text-slate-400 text-2xl sm:text-4xl">
        You are not authorized to access this page
      </h1>
      <Link
        href="/"
        className="flex items-center gap-2 bg-slate-700 mt-8 p-2 px-6 rounded-full text-white max-sm:text-sm"
      >
        Go to home <ArrowRightIcon size={18} />
      </Link>
    </div>
  );
};

export default StoreLayout;
