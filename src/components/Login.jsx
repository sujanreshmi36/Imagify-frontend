import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useContext(AppContext);
  useEffect(() => {
    document.body.style.overflow = "hidden"; //stops scrolling when component is mounted
    return () => {
      document.body.style.overflow = "unset"; //enable scrolling when component is unmounted
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        {state === "Login" && (
          <p className="mt-1 text-sm">
            Welcome back! Please sign in to continue
          </p>
        )}
        {state !== "Login" && (
          <div className="flex items-center gap-2 border px-4 py-2 rounded-full mt-5">
            <img src={assets.profile_icon} className="w-5" alt="" />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="flex items-center gap-2 border px-5 py-2 rounded-full mt-5">
          <img src={assets.email_icon} className="w-4" alt="" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="flex items-center gap-2 border px-6 py-2 rounded-full mt-5">
          <img src={assets.lock_icon} className="w-3" alt="" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {state === "Login" ? (
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forgot password?
          </p>
        ) : (
          <p className="my-8"></p>
        )}
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create an account"}
        </button>
        {state !== "Login" ? (
          <p className="mt-5 text-center">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Don't have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};

export default Login;
