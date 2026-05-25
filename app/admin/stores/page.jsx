"use client";
import StoreInfo from "@/components/admin/StoreInfo";
import Loading from "@/components/Loading";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchStores = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(data.stores);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleIsActive = async (storeId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/admin/toggle-store",
        { storeId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      await fetchStores();
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStores();
    }
  }, [user]);

  return !loading ? (
    <div className="mb-28 text-slate-500">
      <h1 className="text-2xl">
        Live <span className="font-medium text-slate-800">Stores</span>
      </h1>

      {stores.length ? (
        <div className="flex flex-col gap-4 mt-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex max-md:flex-col md:items-end gap-4 bg-white shadow-sm p-6 border border-slate-200 rounded-lg max-w-4xl"
            >
              {/* Store Info */}
              <StoreInfo store={store} />

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <p>Active</p>
                <label className="inline-flex relative items-center text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() =>
                      toast.promise(toggleIsActive(store.id), {
                        loading: "Updating data...",
                      })
                    }
                    checked={store.isActive}
                  />
                  <div className="peer bg-slate-300 peer-checked:bg-green-600 rounded-full w-9 h-5 transition-colors duration-200"></div>
                  <span className="top-1 left-1 absolute bg-white rounded-full w-3 h-3 transition-transform peer-checked:translate-x-4 duration-200 ease-in-out dot"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <h1 className="font-medium text-slate-400 text-3xl">
            No stores Available
          </h1>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
