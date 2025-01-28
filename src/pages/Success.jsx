import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(async () => {
    const response = await axios.patch(backendUrl + "/payment/change-payment", {
      headers: { Authorization: "Bearer " + token },
    });
    navigate("/");
    return response;
  }, [navigate]);
  return;
};

export default Success;
