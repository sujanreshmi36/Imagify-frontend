import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Password validation (at least 6 characters)
  const validatePassword = (password) => password.length >= 6;

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let validationErrors = {};
    let formValid = true;

    // Validate password
    if (!password) {
      validationErrors.password = "Password is required";
      formValid = false;
    } else if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 6 characters long";
      formValid = false;
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
      formValid = false;
    }

    setErrors(validationErrors);
    if (!formValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${backendUrl}/auth/update-password`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        toast.success("Password reset successfully");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
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
          Reset Password
        </h1>
        <div className="flex items-center gap-2 border px-6 py-2 rounded-full mt-5 relative">
          <img src={assets.lock_icon} className="w-3" alt="" />
          <input
            className="outline-none text-sm w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
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
        )}

        <div className="flex items-center gap-2 border px-6 py-2 rounded-full mt-5 relative">
          <img src={assets.lock_icon} className="w-3" alt="" />
          <input
            className="outline-none text-sm w-full"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}

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
