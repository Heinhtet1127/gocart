"use client";
import { dummyStoreData, productDummyData } from "@/assets/assets";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { MailIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StoreShop() {
  const { username } = useParams();
  const [products, setProducts] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStoreData = async () => {
    setStoreInfo(dummyStoreData);
    setProducts(productDummyData);
    setLoading(false);
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  return !loading ? (
    <div className="mx-6 min-h-[70vh]">
      {/* Store Info Banner */}
      {storeInfo && (
        <div className="flex md:flex-row flex-col items-center gap-6 bg-slate-50 shadow-xs mx-auto mt-6 p-6 md:p-10 rounded-xl max-w-7xl">
          <Image
            src={storeInfo.logo}
            alt={storeInfo.name}
            className="border-2 border-slate-100 rounded-md size-32 sm:size-38 object-cover"
            width={200}
            height={200}
          />
          <div className="md:text-left text-center">
            <h1 className="font-semibold text-slate-800 text-3xl">
              {storeInfo.name}
            </h1>
            <p className="mt-2 max-w-lg text-slate-600 text-sm">
              {storeInfo.description}
            </p>
            <div className="space-y-1 mt-4 text-slate-500 text-xs"></div>
            <div className="space-y-2 text-slate-500 text-sm">
              <div className="flex items-center">
                <MapPinIcon className="mr-2 w-4 h-4 text-gray-500" />
                <span>{storeInfo.address}</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="mr-2 w-4 h-4 text-gray-500" />
                <span>{storeInfo.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mx-auto mb-40 max-w-7xl">
        <h1 className="mt-12 text-2xl">
          Shop <span className="font-medium text-slate-800">Products</span>
        </h1>
        <div className="sm:flex flex-wrap gap-6 xl:gap-12 grid grid-cols-2 mx-auto mt-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
