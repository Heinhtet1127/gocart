"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { format } from "date-fns";
import { DeleteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminCoupons() {
  const { getToken } = useAuth();
  const [coupons, setCoupons] = useState([]);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discount: "",
    forNewUser: false,
    forMember: false,
    isPublic: false,
    expiresAt: new Date(),
  });

  const fetchCoupons = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/coupon", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(data.coupons);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();

      newCoupon.discount = Number(newCoupon.discount);
      newCoupon.expiresAt = new Date(newCoupon.expiresAt);

      // Send the POST request to add the coupon
      const { data } = await axios.post(
        "/api/admin/coupon",
        { coupon: newCoupon },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      await fetchCoupons();
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  const handleChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const deleteCoupon = async (code) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this coupon?",
      );
      if (!confirm) return;

      const token = await getToken();
      await axios.delete(`/api/admin/coupon?code=${code}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchCoupons();
      toast.success("Coupon deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="mb-40 text-slate-500">
      {/* Add Coupon */}
      <form
        onSubmit={(e) =>
          toast.promise(handleAddCoupon(e), { loading: "Adding coupon..." })
        }
        className="max-w-sm text-sm"
      >
        <h2 className="text-2xl">
          Add <span className="font-medium text-slate-800">Coupons</span>
        </h2>
        <div className="flex max-sm:flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="mt-2 p-2 border border-slate-200 rounded-md outline-slate-400 w-full"
            name="code"
            value={newCoupon.code}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Coupon Discount (%)"
            min={1}
            max={100}
            className="mt-2 p-2 border border-slate-200 rounded-md outline-slate-400 w-full"
            name="discount"
            value={newCoupon.discount}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Coupon Description"
          className="mt-2 p-2 border border-slate-200 rounded-md outline-slate-400 w-full"
          name="description"
          value={newCoupon.description}
          onChange={handleChange}
          required
        />

        <label>
          <p className="mt-3">Coupon Expiry Date</p>
          <input
            type="date"
            placeholder="Coupon Expires At"
            className="mt-1 p-2 border border-slate-200 rounded-md outline-slate-400 w-full"
            name="expiresAt"
            value={format(newCoupon.expiresAt, "yyyy-MM-dd")}
            onChange={handleChange}
          />
        </label>

        <div className="mt-5">
          <div className="flex gap-2 mt-3">
            <label className="inline-flex relative items-center gap-3 text-gray-900 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="forNewUser"
                checked={newCoupon.forNewUser}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })
                }
              />
              <div className="peer bg-slate-300 peer-checked:bg-green-600 rounded-full w-11 h-6 transition-colors duration-200"></div>
              <span className="top-1 left-1 absolute bg-white rounded-full w-4 h-4 transition-transform peer-checked:translate-x-5 duration-200 ease-in-out dot"></span>
            </label>
            <p>For New User</p>
          </div>
          <div className="flex gap-2 mt-3">
            <label className="inline-flex relative items-center gap-3 text-gray-900 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="forMember"
                checked={newCoupon.forMember}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, forMember: e.target.checked })
                }
              />
              <div className="peer bg-slate-300 peer-checked:bg-green-600 rounded-full w-11 h-6 transition-colors duration-200"></div>
              <span className="top-1 left-1 absolute bg-white rounded-full w-4 h-4 transition-transform peer-checked:translate-x-5 duration-200 ease-in-out dot"></span>
            </label>
            <p>For Member</p>
          </div>
        </div>
        <button className="bg-slate-700 mt-4 p-2 px-10 rounded text-white active:scale-95 transition">
          Add Coupon
        </button>
      </form>

      {/* List Coupons */}
      <div className="mt-14">
        <h2 className="text-2xl">
          List <span className="font-medium text-slate-800">Coupons</span>
        </h2>
        <div className="mt-4 border border-slate-200 rounded-lg max-w-4xl overflow-x-auto">
          <table className="bg-white min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-600 text-left">
                  Code
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600 text-left">
                  Description
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600 text-left">
                  Discount
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600 text-left">
                  Expires At
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600 text-left">
                  New User
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600 text-left">
                  For Member
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {coupons.map((coupon) => (
                <tr key={coupon.code} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {coupon.code}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {coupon.description}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {coupon.discount}%
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {format(coupon.expiresAt, "yyyy-MM-dd")}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {coupon.forNewUser ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {coupon.forMember ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    <DeleteIcon
                      onClick={() =>
                        toast.promise(deleteCoupon(coupon.code), {
                          loading: "Deleting coupon...",
                        })
                      }
                      className="w-5 h-5 text-red-500 hover:text-red-800 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
