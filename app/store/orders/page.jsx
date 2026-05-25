"use client";
import { orderDummyData } from "@/assets/assets";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

export default function StoreOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    setOrders(orderDummyData);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    // Logic to update the status of an order
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="mb-5 text-slate-500 text-2xl">
        Store <span className="font-medium text-slate-800">Orders</span>
      </h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="shadow border border-gray-200 rounded-md max-w-4xl overflow-x-auto">
          <table className="w-full text-gray-600 text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">
              <tr>
                {[
                  "Sr. No.",
                  "Customer",
                  "Total",
                  "Payment",
                  "Coupon",
                  "Status",
                  "Date",
                ].map((heading, i) => (
                  <th key={i} className="px-4 py-3">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => openModal(order)}
                >
                  <td className="pl-6 text-green-600">{index + 1}</td>
                  <td className="px-4 py-3">{order.user?.name}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    ${order.total}
                  </td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>
                  <td className="px-4 py-3">
                    {order.isCouponUsed ? (
                      <span className="bg-green-100 px-2 py-1 rounded-full text-green-700 text-xs">
                        {order.coupon?.code}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="border-gray-300 rounded-md focus:ring focus:ring-blue-200 text-sm"
                    >
                      <option value="ORDER_PLACED">ORDER_PLACED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div
          onClick={closeModal}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-xs text-slate-700 text-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl"
          >
            <h2 className="mb-4 font-semibold text-slate-900 text-xl text-center">
              Order Details
            </h2>

            {/* Customer Details */}
            <div className="mb-4">
              <h3 className="mb-2 font-semibold">Customer Details</h3>
              <p>
                <span className="text-green-700">Name:</span>{" "}
                {selectedOrder.user?.name}
              </p>
              <p>
                <span className="text-green-700">Email:</span>{" "}
                {selectedOrder.user?.email}
              </p>
              <p>
                <span className="text-green-700">Phone:</span>{" "}
                {selectedOrder.address?.phone}
              </p>
              <p>
                <span className="text-green-700">Address:</span>{" "}
                {`${selectedOrder.address?.street}, ${selectedOrder.address?.city}, ${selectedOrder.address?.state}, ${selectedOrder.address?.zip}, ${selectedOrder.address?.country}`}
              </p>
            </div>

            {/* Products */}
            <div className="mb-4">
              <h3 className="mb-2 font-semibold">Products</h3>
              <div className="space-y-2">
                {selectedOrder.orderItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 shadow p-2 border border-slate-100 rounded"
                  >
                    <img
                      src={
                        item.product.images?.[0].src || item.product.images?.[0]
                      }
                      alt={item.product?.name}
                      className="rounded w-16 h-16 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-slate-800">{item.product?.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Status */}
            <div className="mb-4">
              <p>
                <span className="text-green-700">Payment Method:</span>{" "}
                {selectedOrder.paymentMethod}
              </p>
              <p>
                <span className="text-green-700">Paid:</span>{" "}
                {selectedOrder.isPaid ? "Yes" : "No"}
              </p>
              {selectedOrder.isCouponUsed && (
                <p>
                  <span className="text-green-700">Coupon:</span>{" "}
                  {selectedOrder.coupon.code} ({selectedOrder.coupon.discount}%
                  off)
                </p>
              )}
              <p>
                <span className="text-green-700">Status:</span>{" "}
                {selectedOrder.status}
              </p>
              <p>
                <span className="text-green-700">Order Date:</span>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
