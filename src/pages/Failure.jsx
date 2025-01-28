import React from "react";
import { useNavigate } from "react-router-dom";
const Failure = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center items-center min-w-80">
      <h1 className="text-3xl font-bold text-red-500 m-3">Payment Failed!</h1>
      <p>There was an issue with your payment. Please try again.</p>
      <button
        onClick={() => navigate("/")}
        className="px-[20px] py-[10px] bg-blue-600 text-white border rounded-md cursor-pointer m-4"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Failure;
