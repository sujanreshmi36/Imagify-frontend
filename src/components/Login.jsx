import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the spinner

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" }); // Error state
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  // Password validation (at least 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    let formValid = true;
    let validationErrors = { email: "", password: "" };

    // Validate email
    if (!email) {
      validationErrors.email = "Email is required";
      formValid = false;
    } else if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
      formValid = false;
    }

    // Validate password
    if (!password) {
      validationErrors.password = "Password is required";
      formValid = false;
    } else if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 6 characters long";
      formValid = false;
    }

    // Set errors if validation failed
    setErrors(validationErrors);

    if (!formValid) {
      setLoading(false);
      return; // Stop submission if validation fails
    }

    try {
      if (state === "Login") {
        try {
          const response = await axios.post(backendUrl + "/auth/login", {
            email,
            password,
          });
          if (response.data.status) {
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
            navigate("/");
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (e) {
          toast.error(e.response.data.message);
        }
      } else {
        try {
          const response = await axios.post(backendUrl + "/auth/register", {
            name,
            email,
            password,
          });
          if (response.data.success) {
            setState("Login");
            setEmail("");
            setPassword("");
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (e) {
          toast.error(e.response.data.message);
        }
      }
    } catch (e) {
      toast.error(e.response.data.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Stops scrolling when component is mounted
    return () => {
      document.body.style.overflow = "unset"; // Enables scrolling when component is unmounted
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
        onSubmit={submitHandler}
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
              onChange={(e) => setName(e.target.value)}
              value={name}
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}{" "}
        {/* Email Error */}
        <div className="flex items-center gap-2 border px-6 py-2 rounded-full mt-5">
          <img src={assets.lock_icon} className="w-3" alt="" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}{" "}
        {/* Password Error */}
        {state === "Login" ? (
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forgot password?
          </p>
        ) : (
          <p className="my-8"></p>
        )}
        <button
          className="bg-blue-600 w-full text-white py-2 rounded-full flex items-center justify-center"
          type="submit"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ClipLoader size={20} color={"#FFFFFF"} loading={loading} /> // Show loader if loading
          ) : state === "Login" ? (
            "Login"
          ) : (
            "Create an account"
          )}
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
