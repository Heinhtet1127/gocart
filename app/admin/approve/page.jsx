"use client";
import { storesDummyData } from "@/assets/assets";
import StoreInfo from "@/components/admin/StoreInfo";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminApprove() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    setStores(storesDummyData);
    setLoading(false);
  };

  const handleApprove = async ({ storeId, status }) => {
    // Logic to approve a store
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return !loading ? (
    <div className="mb-28 text-slate-500">
      <h1 className="text-2xl">
        Approve <span className="font-medium text-slate-800">Stores</span>
      </h1>

      {stores.length ? (
        <div className="flex flex-col gap-4 mt-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex max-md:flex-col md:items-end gap-4 bg-white shadow-sm p-6 border rounded-lg max-w-4xl"
            >
              {/* Store Info */}
              <StoreInfo store={store} />

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() =>
                    toast.promise(
                      handleApprove({ storeId: store.id, status: "approved" }),
                      { loading: "approving" },
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    toast.promise(
                      handleApprove({ storeId: store.id, status: "rejected" }),
                      { loading: "rejecting" },
                    )
                  }
                  className="bg-slate-500 hover:bg-slate-600 px-4 py-2 rounded text-white text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <h1 className="font-medium text-slate-400 text-3xl">
            No Application Pending
          </h1>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
