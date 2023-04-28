import React, { createContext, useEffect, useState } from "react";
import Login from "../container/Login";
import Register from "../container/Register";
import About from "../container/About";
import Cart from "../components/Cart";
import CategoryList from "../components/Category";
import Product from "../container/Product";
import ProductDetails from "../components/ProductDetails";
import Profile from "../components/Profile";
import Contact from "../container/Contact";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../container/Home";
export const UserContext = createContext();
const Routing = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    console.log(token);
    setToken(token);
  },[token]);
  return (
    <Routes>
    
     
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>
       
<Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
