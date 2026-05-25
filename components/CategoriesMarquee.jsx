import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {
  return (
    <div className="group relative mx-auto sm:my-20 w-full max-w-7xl overflow-hidden select-none">
      <div className="top-0 left-0 z-10 absolute bg-gradient-to-r from-white to-transparent w-20 h-full pointer-events-none" />
      <div className="flex gap-4 min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...categories, ...categories, ...categories, ...categories].map(
          (company, index) => (
            <button
              key={index}
              className="bg-slate-100 hover:bg-slate-600 px-5 py-2 rounded-lg text-slate-500 hover:text-white text-xs sm:text-sm active:scale-95 transition-all duration-300"
            >
              {company}
            </button>
          ),
        )}
      </div>
      <div className="top-0 right-0 z-10 absolute bg-gradient-to-l from-white to-transparent w-20 md:w-40 h-full pointer-events-none" />
    </div>
  );
};

export default CategoriesMarquee;
