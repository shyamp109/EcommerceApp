import React, { createContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumbs";
import { api } from "../api";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
export const UserContaxt = createContext();
const MainLayout = () => {
  var location = useLocation();
  const productListRef = useRef(null);
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [noProductsFound,setNoProductsFound] = useState("");
  const {user} = useSelector(state => state.auth);
  const handleSearchChange = async (event) => {
    try {
      setSearchItem(event.target.value);
      const { data } = await api.product.search(event.target.value);
      setProducts(data.productlist);
      const suggetData = data.productlist;
      setSuggestions(suggetData);
      if (data.productlist.length === 0) {
        setNoProductsFound(true);
      } else {
        setNoProductsFound(false);
      }
    } catch (error) {
      
      enqueueSnackbar("An error occurred while searching for products.", {
        variant: "error",
      });
    }
  };
  const NavigatePerUser = () => {
    if (user.token === null) {
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    } 
  };
  return (
    <div>
      <UserContaxt.Provider
        value={{
          user,
          handleSearchChange,
          searchItem,
          setSearchItem,
          products,
          setProducts,
          productListRef,
          noProductsFound,
          setNoProductsFound,
          suggestions
        }}
      >
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
