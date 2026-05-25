"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchIsAdmin = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
    }
  }, [user]);

  return loading ? (
    <Loading />
  ) : isAdmin ? (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
        <AdminSidebar />
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

export default AdminLayout;
