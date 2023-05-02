import React, { createContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumbs";
import { api } from "../api";
export const UserContaxt = createContext();
const MainLayout = () => {
  var location = useLocation();
  const productListRef = useRef(null);
  const [searchItem, setSearchItem] = useState('');
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("loginToken");
  const data = JSON.parse(token);
  const handleSearchChange =async (event) => {
    setSearchItem(event.target.value);
    console.log("kjsdkgjbdf",searchItem)
    const { data } = await api.product.search(event.target.value);
    console.log("daat",data);
    setProducts(data.productlist)
    setTimeout(() => {
      productListRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };
  const NavigatePerUser = () => {
    if (token) {
      return <Outlet />;
    } else {
      return <Navigate to={"/login"} />;
    }
  };
  return (
    <div>
      <UserContaxt.Provider value={{ data,handleSearchChange,searchItem,setSearchItem,products,setProducts,productListRef }}>
        <Navbar />
        <Breadcrumb path={location} />
        {/* <Outlet /> */}
        {NavigatePerUser()}
        <Footer />
      </UserContaxt.Provider>
    </div>
  );
};

export default MainLayout;
