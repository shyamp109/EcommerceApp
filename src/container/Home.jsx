import SliderImage from "../components/Slider";
import Product from "./Product";
import About from "./About";
import Contact from "./Contact";
import Promotions from "../components/Promotion";
import React from "react";
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
