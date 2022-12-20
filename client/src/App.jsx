import Home from "./pages/Home";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./pages/CartPage";
import { BillsPage } from "./pages/BillsPage";
import { Customers } from "./pages/Customers";
import { StatisticPage } from "./pages/StatisticPage";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from 'react-redux';
import { useEffect } from "react";

function App() {
  const cart= useSelector((state)=>state.cart)
  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
  
   
  }, [cart])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <Home />
            </RouteControl>
          }
        />
        <Route path="/cart" element={<RouteControl>
              <CartPage />
            </RouteControl>} />
        <Route path="/bills" element={<RouteControl>
              <BillsPage />
            </RouteControl>} />
        <Route path="/customers" element={<RouteControl>
              <Customers />
            </RouteControl>} />
        <Route path="/statistic" element={<RouteControl>
              <StatisticPage />
            </RouteControl>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<RouteControl>
              <ProductPage />
            </RouteControl>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
