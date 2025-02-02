import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  // Password validation (at least 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate password
    if (!password) {
      validationErrors.password = "Password is required";
      formValid = false;
    } else if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 6 characters long";
      formValid = false;
    }
    try {
      const response = await axios.patch(
        `${backendUrl}/auth/update-password`,
        {
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
        <div className="flex items-center gap-2 border px-6 py-2 rounded-full mt-5 relative">
          <img src={assets.lock_icon} className="w-3" alt="" />
          <input
            className="outline-none text-sm w-full"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)} // Toggle show password
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}{" "}
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

export default ResetPassword;
