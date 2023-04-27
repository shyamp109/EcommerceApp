import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
// import { Paper } from "@mui/material";
import cat1 from "../assets/images/attractive-stylish-woman-choosing-apparel-clothing-store.jpg";
import cat2 from "../assets/images/baby-shoes.jpg";
import cat3 from "../assets/images/the-dk-photography-NUoPWImmjCU-unsplash.jpg";
import cat4 from "../assets/images/full-length-portrait-cute-little-kid-girl-stylish-jeans-clothes-smiling-standing-white-kids-fashion-concept.jpg";
import cat5 from "../assets/images/high-heel-shoes.jpg";
import cat6 from "../assets/images/portrait-handsome-smiling-stylish-young-man-model-wearing-jeans-clothes-sunglasses-fashion-man.jpg";
import cat7 from "../assets/images/luis-soto-VSDlviLcUMc-unsplash.jpg";

import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper";
import SwiperCore, { EffectCoverflow } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../App.css";
import { Typography } from "@mui/material";

SwiperCore.use([EffectCoverflow, Pagination]);
// if you want to use array
const slide_img = [cat1, cat2, cat3, cat4, cat5, cat6, cat7,cat1, cat2, cat3, cat4, cat5, cat6, cat7];

function CategorySwiper() {
  return (
    <div>
      <Typography
        color="otherColor"
        textAlign="left"
        mt={4}
        sx={{
          fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
        }}
        component="h3"
      >
        CategoryList
      </Typography>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 250,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        modules={[Autoplay, Pagination, Navigation]}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}

        
        className="mySwiper"
      >
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={img} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CategorySwiper;
