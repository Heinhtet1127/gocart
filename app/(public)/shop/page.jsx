"use client";
import ProductCard from "@/components/ProductCard";
import { MoveLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useSelector } from "react-redux";

function ShopContent() {
  // get query params ?search=abc
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();

  const products = useSelector((state) => state.product.list);

  const filteredProducts = search
    ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  return (
    <div className="mx-6 min-h-[70vh]">
      <div className="mx-auto max-w-7xl">
        <h1
          onClick={() => router.push("/shop")}
          className="flex items-center gap-2 my-6 text-slate-500 text-2xl cursor-pointer"
        >
          {" "}
          {search && <MoveLeftIcon size={20} />} All{" "}
          <span className="font-medium text-slate-700">Products</span>
        </h1>
        <div className="sm:flex flex-wrap gap-6 xl:gap-12 grid grid-cols-2 mx-auto mb-32">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
