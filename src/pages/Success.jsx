import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const { backendUrl, token, loadCredit } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data"); // Get "data" parameter from URL
  console.log(data);

  useEffect(() => {
    const updatePayment = async () => {
      if (!data) {
        console.error("No payment data found in URL.");
        return;
      }

      try {
        const response = await axios.patch(
          `${backendUrl}/payment/change-payment/${data}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Payment updated successfully:", response.data);
        navigate("/");
        loadCredit();
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    };

    updatePayment();
  }, [data, token, loadCredit]);

  return (
    <div className="min-h-[70vh] top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center items-center min-w-80">
      Processing your payment...
    </div>
  );
};

export default Success;
