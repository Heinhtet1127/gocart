"use client";
import { DotIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import RatingModal from "./RatingModal";

const OrderItem = ({ order }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const [ratingModal, setRatingModal] = useState(null);

  const { ratings } = useSelector((state) => state.rating);

  return (
    <>
      <tr className="text-sm">
        <td className="text-left">
          <div className="flex flex-col gap-6">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex justify-center items-center bg-slate-100 rounded-md w-20 aspect-square">
                  <Image
                    className="w-auto h-14"
                    src={item.product.images[0]}
                    alt="product_img"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="flex flex-col justify-center text-sm">
                  <p className="font-medium text-slate-600 text-base">
                    {item.product.name}
                  </p>
                  <p>
                    {currency}
                    {item.price} Qty : {item.quantity}{" "}
                  </p>
                  <p className="mb-1">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                  <div>
                    {ratings.find(
                      (rating) =>
                        order.id === rating.orderId &&
                        item.product.id === rating.productId,
                    ) ? (
                      <Rating
                        value={
                          ratings.find(
                            (rating) =>
                              order.id === rating.orderId &&
                              item.product.id === rating.productId,
                          ).rating
                        }
                      />
                    ) : (
                      <button
                        onClick={() =>
                          setRatingModal({
                            orderId: order.id,
                            productId: item.product.id,
                          })
                        }
                        className={`text-green-500 hover:bg-green-50 transition ${order.status !== "DELIVERED" && "hidden"}`}
                      >
                        Rate Product
                      </button>
                    )}
                  </div>
                  {ratingModal && (
                    <RatingModal
                      ratingModal={ratingModal}
                      setRatingModal={setRatingModal}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </td>

        <td className="max-md:hidden text-center">
          {currency}
          {order.total}
        </td>

        <td className="max-md:hidden text-left">
          <p>
            {order.address.name}, {order.address.street},
          </p>
          <p>
            {order.address.city}, {order.address.state}, {order.address.zip},{" "}
            {order.address.country},
          </p>
          <p>{order.address.phone}</p>
        </td>

        <td className="max-md:hidden space-y-2 text-sm text-left">
          <div
            className={`flex items-center justify-center gap-1 rounded-full p-1 ${
              order.status === "confirmed"
                ? "text-yellow-500 bg-yellow-100"
                : order.status === "delivered"
                  ? "text-green-500 bg-green-100"
                  : "text-slate-500 bg-slate-100"
            }`}
          >
            <DotIcon size={10} className="scale-250" />
            {order.status.split("_").join(" ").toLowerCase()}
          </div>
        </td>
      </tr>
      {/* Mobile */}
      <tr className="md:hidden">
        <td colSpan={5}>
          <p>
            {order.address.name}, {order.address.street}
          </p>
          <p>
            {order.address.city}, {order.address.state}, {order.address.zip},{" "}
            {order.address.country}
          </p>
          <p>{order.address.phone}</p>
          <br />
          <div className="flex items-center">
            <span className="bg-green-100 mx-auto px-6 py-1.5 rounded text-green-700 text-center">
              {order.status.replace(/_/g, " ").toLowerCase()}
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          <div className="mx-auto border-slate-300 border-b w-6/7" />
        </td>
      </tr>
    </>
  );
};

export default OrderItem;
