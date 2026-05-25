"use client";
import { assets } from "@/assets/assets";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import CategoriesMarquee from "./CategoriesMarquee";

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 mx-auto my-10 max-w-7xl">
        <div className="group relative flex flex-col flex-1 bg-green-200 rounded-3xl xl:min-h-100">
          <div className="p-5 sm:p-16">
            <div className="inline-flex items-center gap-3 bg-green-300 p-1 pr-4 rounded-full text-green-600 text-xs sm:text-sm">
              <span className="bg-green-600 max-sm:ml-1 px-3 py-1 rounded-full text-white text-xs">
                NEWS
              </span>{" "}
              Free Shipping on Orders Above $50!{" "}
              <ChevronRightIcon
                className="group-hover:ml-2 transition-all"
                size={16}
              />
            </div>
            <h2 className="bg-clip-text bg-gradient-to-r from-slate-600 to-[#A0FF74] my-3 max-w-xs sm:max-w-md font-medium text-transparent text-3xl sm:text-5xl leading-[1.2]">
              Gadgets you'll love. Prices you'll trust.
            </h2>
            <div className="mt-4 sm:mt-8 font-medium text-slate-800 text-sm">
              <p>Starts from</p>
              <p className="text-3xl">{currency}4.90</p>
            </div>
            <button className="bg-slate-800 hover:bg-slate-900 mt-4 sm:mt-10 px-7 sm:px-12 py-2.5 sm:py-5 rounded-md text-white text-sm hover:scale-103 active:scale-95 transition">
              LEARN MORE
            </button>
          </div>
          <Image
            className="right-0 md:right-10 bottom-0 sm:absolute w-full sm:max-w-sm"
            src={assets.hero_model_img}
            alt=""
          />
        </div>
        <div className="flex md:flex-row flex-col xl:flex-col gap-5 w-full xl:max-w-sm text-slate-600 text-sm">
          <div className="group flex flex-1 justify-between items-center bg-orange-200 p-6 px-8 rounded-3xl w-full">
            <div>
              <p className="bg-clip-text bg-gradient-to-r from-slate-800 to-[#FFAD51] max-w-40 font-medium text-transparent text-3xl">
                Best products
              </p>
              <p className="flex items-center gap-1 mt-4">
                View more{" "}
                <ArrowRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={18}
                />{" "}
              </p>
            </div>
            <Image className="w-35" src={assets.hero_product_img1} alt="" />
          </div>
          <div className="group flex flex-1 justify-between items-center bg-blue-200 p-6 px-8 rounded-3xl w-full">
            <div>
              <p className="bg-clip-text bg-gradient-to-r from-slate-800 to-[#78B2FF] max-w-40 font-medium text-transparent text-3xl">
                20% discounts
              </p>
              <p className="flex items-center gap-1 mt-4">
                View more{" "}
                <ArrowRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={18}
                />{" "}
              </p>
            </div>
            <Image className="w-35" src={assets.hero_product_img2} alt="" />
          </div>
        </div>
      </div>
      <CategoriesMarquee />
    </div>
  );
};

export default Hero;
