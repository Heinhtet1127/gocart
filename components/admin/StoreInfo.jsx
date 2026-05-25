"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const StoreInfo = ({ store }) => {
  return (
    <div className="flex-1 space-y-2 text-sm">
      <Image
        width={100}
        height={100}
        src={store.logo}
        alt={store.name}
        className="shadow max-sm:mx-auto rounded-full max-w-20 max-h-20 object-contain"
      />
      <div className="flex sm:flex-row flex-col items-center gap-3">
        <h3 className="font-semibold text-slate-800 text-xl"> {store.name} </h3>
        <span className="text-sm">@{store.username}</span>

        {/* Status Badge */}
        <span
          className={`text-xs font-semibold px-4 py-1 rounded-full ${
            store.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : store.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {store.status}
        </span>
      </div>

      <p className="my-5 max-w-2xl text-slate-600">{store.description}</p>
      <p className="flex items-center gap-2">
        {" "}
        <MapPin size={16} /> {store.address}
      </p>
      <p className="flex items-center gap-2">
        <Phone size={16} /> {store.contact}
      </p>
      <p className="flex items-center gap-2">
        <Mail size={16} /> {store.email}
      </p>
      <p className="mt-5 text-slate-700">
        Applied on{" "}
        <span className="text-xs">
          {new Date(store.createdAt).toLocaleDateString()}
        </span>{" "}
        by
      </p>
      <div className="flex items-center gap-2 text-sm">
        <Image
          width={36}
          height={36}
          src={store.user.image}
          alt={store.user.name}
          className="rounded-full w-9 h-9"
        />
        <div>
          <p className="font-medium text-slate-600">{store.user.name}</p>
          <p className="text-slate-400">{store.user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
