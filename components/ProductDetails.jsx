"use client";

import { addToCart } from "@/lib/features/cart/cartSlice";
import {
  CreditCardIcon,
  EarthIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "./Counter";

const ProductDetails = ({ product }) => {
  const productId = product.id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const router = useRouter();

  const [mainImage, setMainImage] = useState(product.images[0]);

  const addToCartHandler = () => {
    dispatch(addToCart({ productId }));
  };

  const averageRating =
    product.rating.reduce((acc, item) => acc + item.rating, 0) /
    product.rating.length;

  return (
    <div className="flex max-lg:flex-col gap-12">
      <div className="flex max-sm:flex-col-reverse gap-3">
        <div className="flex sm:flex-col gap-3">
          {product.images.map((image, index) => (
            <div
              key={index}
              onClick={() => setMainImage(product.images[index])}
              className="group flex justify-center items-center bg-slate-100 rounded-lg size-26 cursor-pointer"
            >
              <Image
                src={image}
                className="group-active:scale-95 group-hover:scale-103 transition"
                alt=""
                width={45}
                height={45}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center bg-slate-100 rounded-lg h-100 sm:size-113">
          <Image src={mainImage} alt="" width={250} height={250} />
        </div>
      </div>
      <div className="flex-1">
        <h1 className="font-semibold text-slate-800 text-3xl">
          {product.name}
        </h1>
        <div className="flex items-center mt-2">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="mt-0.5 text-transparent"
                fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"}
              />
            ))}
          <p className="ml-3 text-slate-500 text-sm">
            {product.rating.length} Reviews
          </p>
        </div>
        <div className="flex items-start gap-3 my-6 font-semibold text-slate-800 text-2xl">
          <p>
            {" "}
            {currency}
            {product.price}{" "}
          </p>
          <p className="text-slate-500 text-xl line-through">
            {currency}
            {product.mrp}
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <TagIcon size={14} />
          <p>
            Save{" "}
            {(((product.mrp - product.price) / product.mrp) * 100).toFixed(0)}%
            right now
          </p>
        </div>
        <div className="flex items-end gap-5 mt-10">
          {cart[productId] && (
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-slate-800 text-lg">Quantity</p>
              <Counter productId={productId} />
            </div>
          )}
          <button
            onClick={() =>
              !cart[productId] ? addToCartHandler() : router.push("/cart")
            }
            className="bg-slate-800 hover:bg-slate-900 px-10 py-3 rounded font-medium text-white text-sm active:scale-95 transition"
          >
            {!cart[productId] ? "Add to Cart" : "View Cart"}
          </button>
        </div>
        <hr className="my-5 border-gray-300" />
        <div className="flex flex-col gap-4 text-slate-500">
          <p className="flex gap-3">
            {" "}
            <EarthIcon className="text-slate-400" /> Free shipping
            worldwide{" "}
          </p>
          <p className="flex gap-3">
            {" "}
            <CreditCardIcon className="text-slate-400" /> 100% Secured
            Payment{" "}
          </p>
          <p className="flex gap-3">
            {" "}
            <UserIcon className="text-slate-400" /> Trusted by top brands{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
