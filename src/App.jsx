import { useState } from "react";
import "./App.css";
import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppContextProvider from "./context/AppContext";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
