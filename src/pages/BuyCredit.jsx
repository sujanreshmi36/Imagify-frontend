import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Import the spinner
import { useState } from "react";
const BuyCredit = () => {
  const { user, setShowLogin, backendUrl, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const handleClick = async (e, item) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (e.target.innerText !== "Purchase") {
        setShowLogin(true);
      } else {
        const response = await axios.post(
          backendUrl + "/payment/initiate",
          { plan: item.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.url) {
          window.location.href = response.data.url; // Redirect to payment URL
        } else {
          toast.error("Payment URL not received.");
        }
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      className="min-h-[80vh] text-center pt-14 mb-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 bg-gray-50">
        Our Plans
      </button>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-10">
        Choose the plan
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
            key={index}
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /
              {item.credits} credits
            </p>
            <button
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
              onClick={(e) => handleClick(e, item)}
            >
              {loading ? (
                <ClipLoader size={20} color={"#FFFFFF"} loading={loading} /> // Show loader if loading
              ) : user ? (
                "Purchase"
              ) : (
                "Get Started"
              )}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
