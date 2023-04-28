import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
// import { Paper } from "@mui/material";
import cat1 from "../assets/images/cat1.webp";
import cat2 from "../assets/images/cat2.webp";
import cat3 from "../assets/images/cat3.webp";
import cat4 from "../assets/images/cat4.webp";
import cat5 from "../assets/images/cat5.webp";
import cat6 from "../assets/images/cat6.webp";
import cat7 from "../assets/images/cat7.webp";
import cat8 from "../assets/images/cat8.webp";
import cat9 from "../assets/images/cat9.webp";
import cat10 from "../assets/images/cat10.webp";
import cat11 from "../assets/images/cat11.webp";
import cat12 from "../assets/images/cat12.webp";


import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper";
import SwiperCore, { EffectCoverflow } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../App.css";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ValidatePath } from "../utills/helper";

SwiperCore.use([EffectCoverflow, Pagination]);
// if you want to use array
const slide_img = [cat1, cat2, cat3, cat4, cat5, cat6, cat7,cat8, cat9, cat10, cat11, cat12];

function CategorySwiper() {
  const location = useLocation();
  const [pathName,setPathName] = useState(false);
  useEffect(() => {
    setPathName(ValidatePath(location.pathname));
  }, [location]);
  return (
    <div>
      {pathName && 
          <>
            <Typography
            mt={3}
            color="otherColor"
            textAlign="left"
            sx={{
              fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
            }}
            component="h3"
          >
            Category List
          </Typography>
          </>
        }
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 550,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        
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
              <img src={img} alt="catImg" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CategorySwiper;
