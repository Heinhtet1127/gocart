import { ourSpecsData } from "@/assets/assets";
import Title from "./Title";

const OurSpecs = () => {
  return (
    <div className="mx-auto my-20 px-6 max-w-6xl">
      <Title
        visibleButton={false}
        title="Our Specifications"
        description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free."
      />

      <div className="gap-7 gap-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-26">
        {ourSpecsData.map((spec, index) => {
          return (
            <div
              className="group relative flex flex-col justify-center items-center px-8 border rounded-lg w-full h-44 text-center"
              style={{
                backgroundColor: spec.accent + 10,
                borderColor: spec.accent + 30,
              }}
              key={index}
            >
              <h3 className="font-medium text-slate-800">{spec.title}</h3>
              <p className="mt-3 text-slate-600 text-sm">{spec.description}</p>
              <div
                className="-top-5 absolute flex justify-center items-center rounded-md size-10 text-white group-hover:scale-105 transition"
                style={{ backgroundColor: spec.accent }}
              >
                <spec.icon size={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurSpecs;
