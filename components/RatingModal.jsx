"use client";

import { Star, XIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const RatingModal = ({ ratingModal, setRatingModal }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    if (rating < 0 || rating > 5) {
      return toast("Please select a rating");
    }
    if (review.length < 5) {
      return toast("write a short review");
    }

    setRatingModal(null);
  };

  return (
    <div className="z-120 fixed inset-0 flex justify-center items-center bg-black/10">
      <div className="relative bg-white shadow-lg p-8 rounded-lg w-96">
        <button
          onClick={() => setRatingModal(null)}
          className="top-3 right-3 absolute text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
        </button>
        <h2 className="mb-4 font-medium text-slate-600 text-xl">
          Rate Product
        </h2>
        <div className="flex justify-center items-center mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`size-8 cursor-pointer ${rating > i ? "text-green-400 fill-current" : "text-gray-300"}`}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>
        <textarea
          className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          placeholder="Write your review (optional)"
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          onClick={(e) =>
            toast.promise(handleSubmit(), { loading: "Submitting..." })
          }
          className="bg-green-500 hover:bg-green-600 py-2 rounded-md w-full text-white transition"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
