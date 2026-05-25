"use client";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateStore() {
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();

  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [storeInfo, setStoreInfo] = useState({
    name: "",
    username: "",
    description: "",
    email: "",
    contact: "",
    address: "",
    image: "",
  });

  const onChangeHandler = (e) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const fetchSellerStatus = async () => {
    // Logic to check if the store is already submitted
    const token = await getToken();

    try {
      const { data } = await axios.get("/api/store/create", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (["approved", "rejected", "pending"].includes(data.status)) {
        setStatus(data.status);
        setAlreadySubmitted(true);

        switch (data.status) {
          case "approved":
            setMessage(
              "Your store has been approved, you can now add products to your store from dashboard",
            );
            setTimeout(() => router.push("/store"), 5000);
            break;
          case "rejected":
            setMessage(
              "Your store request has been rejected, contact the admin for more details",
            );
            break;
          case "pending":
            setMessage(
              "Your store request is pending, please wait for admin to approve your store",
            );
            break;
          default:
            break;
        }
      } else {
        setAlreadySubmitted(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }

    setLoading(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast("Please login to continue");
    }

    try {
      const token = await getToken();
      const formData = new FormData();

      formData.append("name", storeInfo.name);
      formData.append("description", storeInfo.description);
      formData.append("username", storeInfo.username);
      formData.append("email", storeInfo.email);
      formData.append("contact", storeInfo.contact);
      formData.append("address", storeInfo.address);
      formData.append("image", storeInfo.image);

      const { data } = await axios.post("/api/store/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message);

      await fetchSellerStatus();
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerStatus();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center mx-6 min-h-[80vh] text-slate-400">
        <h1 className="font-semibold text-2xl sm:text-4xl">
          Please <span className="text-slate-500">Login</span> to continue
        </h1>
      </div>
    );
  }

  return !loading ? (
    <>
      {!alreadySubmitted ? (
        <div className="mx-6 my-16 min-h-[70vh]">
          <form
            onSubmit={(e) =>
              toast.promise(onSubmitHandler(e), {
                loading: "Submitting data...",
              })
            }
            className="flex flex-col items-start gap-3 mx-auto max-w-7xl text-slate-500"
          >
            {/* Title */}
            <div>
              <h1 className="text-3xl">
                Add Your{" "}
                <span className="font-medium text-slate-800">Store</span>
              </h1>
              <p className="max-w-lg">
                To become a seller on GoCart, submit your store details for
                review. Your store will be activated after admin verification.
              </p>
            </div>

            <label className="mt-10 cursor-pointer">
              Store Logo
              <Image
                src={
                  storeInfo.image
                    ? URL.createObjectURL(storeInfo.image)
                    : assets.upload_area
                }
                className="mt-2 rounded-lg w-auto h-16"
                alt=""
                width={150}
                height={100}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setStoreInfo({ ...storeInfo, image: e.target.files[0] })
                }
                hidden
              />
            </label>

            <p>Username</p>
            <input
              name="username"
              onChange={onChangeHandler}
              value={storeInfo.username}
              type="text"
              placeholder="Enter your store username"
              className="p-2 border border-slate-300 rounded outline-slate-400 w-full max-w-lg"
            />

            <p>Name</p>
            <input
              name="name"
              onChange={onChangeHandler}
              value={storeInfo.name}
              type="text"
              placeholder="Enter your store name"
              className="p-2 border border-slate-300 rounded outline-slate-400 w-full max-w-lg"
            />

            <p>Description</p>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={storeInfo.description}
              rows={5}
              placeholder="Enter your store description"
              className="p-2 border border-slate-300 rounded outline-slate-400 w-full max-w-lg resize-none"
            />

            <p>Email</p>
            <input
              name="email"
              onChange={onChangeHandler}
              value={storeInfo.email}
              type="email"
              placeholder="Enter your store email"
              className="p-2 border border-slate-300 rounded outline-slate-400 w-full max-w-lg"
            />

            <p>Contact Number</p>
            <input
              name="contact"
              onChange={onChangeHandler}
              value={storeInfo.contact}
              type="text"
              placeholder="Enter your store contact number"
              className="p-2 border border-slate-300 rounded outline-slate-400 w-full max-w-lg"
            />

            <p>Address</p>
            <textarea
              name="address"
              onChange={onChangeHandler}
              value={storeInfo.address}
              rows={5}
              placeholder="Enter your store address"
              className="p-2 border border-slate-300 rounded outline-slate-400 w-full max-w-lg resize-none"
            />

            <button className="bg-slate-800 hover:bg-slate-900 mt-10 mb-40 px-12 py-2 rounded text-white active:scale-95 transition">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[80vh]">
          <p className="mx-5 max-w-2xl font-semibold text-slate-500 sm:text-2xl lg:text-3xl text-center">
            {message}
          </p>
          {status === "approved" && (
            <p className="mt-5 text-slate-400">
              redirecting to dashboard in{" "}
              <span className="font-semibold">5 seconds</span>
            </p>
          )}
        </div>
      )}
    </>
  ) : (
    <Loading />
  );
}
