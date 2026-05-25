import Title from "./Title";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center mx-4 my-36">
      <Title
        title="Join Newsletter"
        description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week."
        visibleButton={false}
      />
      <div className="flex bg-slate-100 my-10 p-1 border-2 border-white rounded-full ring ring-slate-200 w-full max-w-xl text-sm">
        <input
          className="flex-1 pl-5 outline-none"
          type="text"
          placeholder="Enter your email address"
        />
        <button className="bg-green-500 px-7 py-3 rounded-full font-medium text-white hover:scale-103 active:scale-95 transition">
          Get Updates
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
