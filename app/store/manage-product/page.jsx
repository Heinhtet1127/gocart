"use client";
import { productDummyData } from "@/assets/assets";
import Loading from "@/components/Loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function StoreManageProducts() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setProducts(productDummyData);
    setLoading(false);
  };

  const toggleStock = async (productId) => {
    // Logic to toggle the stock of a product
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="mb-5 text-slate-500 text-2xl">
        Manage <span className="font-medium text-slate-800">Products</span>
      </h1>
      <table className="rounded ring ring-slate-200 w-full max-w-4xl overflow-hidden text-sm text-left">
        <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="hidden md:table-cell px-4 py-3">Description</th>
            <th className="hidden md:table-cell px-4 py-3">MRP</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 border-gray-200 border-t"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Image
                    width={40}
                    height={40}
                    className="shadow p-1 rounded cursor-pointer"
                    src={product.images[0]}
                    alt=""
                  />
                  {product.name}
                </div>
              </td>
              <td className="hidden md:table-cell px-4 py-3 max-w-md text-slate-600 truncate">
                {product.description}
              </td>
              <td className="hidden md:table-cell px-4 py-3">
                {currency} {product.mrp.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                {currency} {product.price.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">
                <label className="inline-flex relative items-center gap-3 text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() =>
                      toast.promise(toggleStock(product.id), {
                        loading: "Updating data...",
                      })
                    }
                    checked={product.inStock}
                  />
                  <div className="peer bg-slate-300 peer-checked:bg-green-600 rounded-full w-9 h-5 transition-colors duration-200"></div>
                  <span className="top-1 left-1 absolute bg-white rounded-full w-3 h-3 transition-transform peer-checked:translate-x-4 duration-200 ease-in-out dot"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
