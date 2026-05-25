"use client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  // calculate the average rating of the product
  const rating = Math.round(
    product.rating.reduce((acc, curr) => acc + curr.rating, 0) /
      product.rating.length,
  );

  return (
    <Link href={`/product/${product.id}`} className="group max-xl:mx-auto">
      <div className="flex justify-center items-center bg-[#F5F5F5] rounded-lg sm:w-60 h-40 sm:h-68">
        <Image
          width={500}
          height={500}
          className="w-auto max-h-30 sm:max-h-40 group-hover:scale-115 transition duration-300"
          src={product.images[0]}
          alt=""
        />
      </div>
      <div className="flex justify-between gap-3 pt-2 max-w-60 text-slate-800 text-sm">
        <div>
          <p>{product.name}</p>
          <div className="flex">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="mt-0.5 text-transparent"
                  fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"}
                />
              ))}
          </div>
        </div>
        <p>
          {currency}
          {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
