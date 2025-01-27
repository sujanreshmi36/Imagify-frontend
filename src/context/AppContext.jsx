import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const loadCredit = async () => {
    try {
      const response = await axios.get(backendUrl + "/users/get-info", {
        headers: { Authorization: "Bearer " + token },
      });
      if (response.data.success) {
        setCredit(response.data.credit);
        setUser(response.data.name);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const response = await axios.post(
        backendUrl + "/users/generate-image",
        { prompt },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      if (response.data.success) {
        loadCredit();
        return response.data.image;
      } else {
        if (response.data.creditBalance === 0) {
          navigate("/buy");
        }
        toast.error(response.data.message);
        loadCredit();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCredit();
    }
  }, [token]);
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCredit,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
