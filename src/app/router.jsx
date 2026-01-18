import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Favorites from "../pages/Favorites";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import About from "../pages/About";
import Profile from "../pages/Profile";


export default function Router() {
  // search holatini bu yerda saqlaymiz
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      {/* Header ga search va setSearch uzatamiz */}
      <Header search={search} setSearch={setSearch} />
      <Routes>
        {/* Home ga ham search prop uzatamiz */}
        <Route path="/" element={<Home search={search} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
