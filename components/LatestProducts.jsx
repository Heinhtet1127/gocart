"use client";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Title from "./Title";

const LatestProducts = () => {
  const displayQuantity = 4;
  const products = useSelector((state) => state.product.list);

  return (
    <div className="mx-auto my-30 px-6 max-w-6xl">
      <Title
        title="Latest Products"
        description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`}
        href="/shop"
      />
      <div className="sm:flex flex-wrap justify-between gap-6 grid grid-cols-2 mt-12">
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, displayQuantity)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default LatestProducts;
