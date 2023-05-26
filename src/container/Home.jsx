import Product from "./Product";
import About from "./About";
import Contact from "./Contact";
import Promotions from "../components/Promotion";
import CategoryList from "../components/Category";
import React, { useEffect } from "react";
import SliderImage from "../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../redux/reducers/cartSlice";
function Home() {
  return (
    <>
      <SliderImage />
      <Promotions />
      <CategoryList />
      <Product />
      <About />
      <Contact />
    </>
  );
}

export default Home;
