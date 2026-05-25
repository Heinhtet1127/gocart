"use client";
import { dummyStoreDashboardData } from "@/assets/assets";
import Loading from "@/components/Loading";
import {
  CircleDollarSignIcon,
  ShoppingBasketIcon,
  StarIcon,
  TagsIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalEarnings: 0,
    totalOrders: 0,
    ratings: [],
  });

  const dashboardCardsData = [
    {
      title: "Total Products",
      value: dashboardData.totalProducts,
      icon: ShoppingBasketIcon,
    },
    {
      title: "Total Earnings",
      value: currency + dashboardData.totalEarnings,
      icon: CircleDollarSignIcon,
    },
    { title: "Total Orders", value: dashboardData.totalOrders, icon: TagsIcon },
    {
      title: "Total Ratings",
      value: dashboardData.ratings.length,
      icon: StarIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyStoreDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mb-28 text-slate-500">
      <h1 className="text-2xl">
        Seller <span className="font-medium text-slate-800">Dashboard</span>
      </h1>

      <div className="flex flex-wrap gap-5 my-10 mt-4">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-11 p-3 px-6 border border-slate-200 rounded-lg"
          >
            <div className="flex flex-col gap-3 text-xs">
              <p>{card.title}</p>
              <b className="font-medium text-slate-700 text-2xl">
                {card.value}
              </b>
            </div>
            <card.icon
              size={50}
              className="bg-slate-100 p-2.5 rounded-full w-11 h-11 text-slate-400"
            />
          </div>
        ))}
      </div>

      <h2>Total Reviews</h2>

      <div className="mt-5">
        {dashboardData.ratings.map((review, index) => (
          <div
            key={index}
            className="flex max-sm:flex-col justify-between sm:items-center gap-5 py-6 border-slate-200 border-b max-w-4xl text-slate-600 text-sm"
          >
            <div>
              <div className="flex gap-3">
                <Image
                  src={review.user.image}
                  alt=""
                  className="rounded-full w-10 aspect-square"
                  width={100}
                  height={100}
                />
                <div>
                  <p className="font-medium">{review.user.name}</p>
                  <p className="font-light text-slate-500">
                    {new Date(review.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 max-w-xs text-slate-500 leading-6">
                {review.review}
              </p>
            </div>
            <div className="flex flex-col justify-between sm:items-end gap-6">
              <div className="flex flex-col sm:items-end">
                <p className="text-slate-400">{review.product?.category}</p>
                <p className="font-medium">{review.product?.name}</p>
                <div className="flex items-center">
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <StarIcon
                        key={index}
                        size={17}
                        className="mt-0.5 text-transparent"
                        fill={
                          review.rating >= index + 1 ? "#00C950" : "#D1D5DB"
                        }
                      />
                    ))}
                </div>
              </div>
              <button
                onClick={() => router.push(`/product/${review.product.id}`)}
                className="bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded transition-all"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
