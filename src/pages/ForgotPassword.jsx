import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email
    if (!email.trim()) {
      setErrors("Email is required");
      setLoading(false);
      return;
    } else if (!validateEmail(email.trim())) {
      setErrors("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/auth/forgot-password`, {
        email,
      });

      if (response.data) {
        toast.success("Reset link sent successfully");
        setEmail(""); // Clear input on success
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <motion.form
        className="p-8 bg-white shadow-lg rounded-xl w-96"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-2xl font-semibold text-gray-700">
          Forgot Password
        </h1>

        <div className="mt-5">
          <label className="block text-gray-600 text-sm mb-1">
            Email Address
          </label>
          <div className="flex items-center border px-4 py-2 rounded-md">
            <img src={assets.email_icon} className="w-4" alt="email-icon" />
            <input
              className="w-full ml-2 outline-none text-sm"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(""); // Clear error on input change
              }}
              value={email}
              required
            />
          </div>
          {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
        </div>

        <button
          className={`w-full text-white py-2 mt-4 rounded-md flex items-center justify-center ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color={"#FFFFFF"} loading={loading} />
          ) : (
            "Submit"
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;
