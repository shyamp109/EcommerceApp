import Product from "./Product";
import About from "./About";
import Contact from "./Contact";
import Promotions from "../components/Promotion";
import React, { useEffect } from "react";
import SliderImage from "../components/Slider";
function Home() {
  return (
    <>
      <SliderImage />
      <Promotions />
      <Product />
      <About />
      <Contact />
    </>
  );
}

export default Home;
