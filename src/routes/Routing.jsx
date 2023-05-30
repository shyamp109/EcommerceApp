import React, { createContext, useEffect, useState } from "react";
import Login from "../container/Login";
import Register from "../container/Register";
import About from "../container/About";
import Cart from "../container/Cart";
import CategoryList from "../components/Category";
import Product from "../container/Product";
import ProductDetails from "../container/ProductDetails";
import Profile from "../container/Profile";
import Contact from "../container/Contact";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../container/Home";
import Checkout from "../container/Checkout";
import CategoryListProduct from "../container/CategoryList";
import OrderHistroy from "../container/OrderHistroy";
import Invoice from "../container/Invoice";
import InvoiceOrder from "../container/Invoice";

export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistroy />} />
        <Route path="orderInvoice" element={<InvoiceOrder />} />

        <Route path="/category" element={<CategoryList />} />
        <Route path="categoryProduct" element={<CategoryListProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
