import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const loadCredit = async () => {
    try {
      const response = await axios.get(backendUrl + "/users/get-info", {
        headers: token,
      });
      if (response.data.success) {
        setCredit(response.data.credit);
        setUser(response.data.name);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
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
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
