import {
  useContext,
  useState,
  useEffect,
  useSearchParams,
  useNavigate,
} from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
const Success = () => {
  const { backendUrl, token, loadCredit } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatePayment = async () => {
      if (!data) {
        console.error("No payment data found in URL.");
        setError("No payment data found.");
        setLoading(false);
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
        loadCredit(); // Update credit balance
        navigate("/"); // Redirect to home or success page
      } catch (error) {
        console.error("Error updating payment:", error);
        setError("Payment update failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    updatePayment();
  }, [data, token, loadCredit, backendUrl, navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center min-w-80">
      {loading ? (
        <p>Processing your payment...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Payment processed successfully!</p>
      )}
    </div>
  );
};

export default Success;
