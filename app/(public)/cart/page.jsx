"use client";
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const { cartItems } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.list);

  const dispatch = useDispatch();

  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const createCartArray = () => {
    setTotalPrice(0);
    const cartArray = [];
    for (const [key, value] of Object.entries(cartItems)) {
      const product = products.find((product) => product.id === key);
      if (product) {
        cartArray.push({
          ...product,
          quantity: value,
        });
        setTotalPrice((prev) => prev + product.price * value);
      }
    }
    setCartArray(cartArray);
  };

  const handleDeleteItemFromCart = (productId) => {
    dispatch(deleteItemFromCart({ productId }));
  };

  useEffect(() => {
    if (products.length > 0) {
      createCartArray();
    }
  }, [cartItems, products]);

  return cartArray.length > 0 ? (
    <div className="mx-6 min-h-screen text-slate-800">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <PageTitle
          heading="My Cart"
          text="items in your cart"
          linkText="Add more"
        />

        <div className="flex max-lg:flex-col justify-between items-start gap-5">
          <table className="w-full max-w-4xl text-slate-600 table-auto">
            <thead>
              <tr className="max-sm:text-sm">
                <th className="text-left">Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th className="max-md:hidden">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartArray.map((item, index) => (
                <tr key={index} className="space-x-2">
                  <td className="flex gap-3 my-4">
                    <div className="flex justify-center items-center gap-3 bg-slate-100 rounded-md size-18">
                      <Image
                        src={item.images[0]}
                        className="w-auto h-14"
                        alt=""
                        width={45}
                        height={45}
                      />
                    </div>
                    <div>
                      <p className="max-sm:text-sm">{item.name}</p>
                      <p className="text-slate-500 text-xs">{item.category}</p>
                      <p>
                        {currency}
                        {item.price}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <Counter productId={item.id} />
                  </td>
                  <td className="text-center">
                    {currency}
                    {(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="max-md:hidden text-center">
                    <button
                      onClick={() => handleDeleteItemFromCart(item.id)}
                      className="hover:bg-red-50 p-2.5 rounded-full text-red-500 active:scale-95 transition-all"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OrderSummary totalPrice={totalPrice} items={cartArray} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mx-6 min-h-[80vh] text-slate-400">
      <h1 className="font-semibold text-2xl sm:text-4xl">Your cart is empty</h1>
    </div>
  );
}
