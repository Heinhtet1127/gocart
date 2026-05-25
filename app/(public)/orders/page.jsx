"use client";
import { orderDummyData } from "@/assets/assets";
import OrderItem from "@/components/OrderItem";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(orderDummyData);
  }, []);

  return (
    <div className="mx-6 min-h-[70vh]">
      {orders.length > 0 ? (
        <div className="mx-auto my-20 max-w-7xl">
          <PageTitle
            heading="My Orders"
            text={`Showing total ${orders.length} orders`}
            linkText={"Go to home"}
          />

          <table className="w-full max-w-5xl text-slate-500 border-separate border-spacing-x-4 border-spacing-y-12 table-auto">
            <thead>
              <tr className="max-md:hidden text-slate-600 max-sm:text-sm">
                <th className="text-left">Product</th>
                <th className="text-center">Total Price</th>
                <th className="text-left">Address</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderItem order={order} key={order.id} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center mx-6 min-h-[80vh] text-slate-400">
          <h1 className="font-semibold text-2xl sm:text-4xl">
            You have no orders
          </h1>
        </div>
      )}
    </div>
  );
}
