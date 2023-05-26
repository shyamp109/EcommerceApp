import * as React from "react";
import Box from "@mui/material/Box";
import img1 from "../assets/images/imgcar1.webp";
import img2 from "../assets/images/imgcar2.webp";
import img3 from "../assets/images/imgcar3.webp";
import img4 from "../assets/images/imgcar4.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import "../../src/index.css";
const slide_img = [img1, img2, img3, img4];

function SliderImage() {
  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Swiper
        height={500}
        style={{ marginTop: "0", marginBottom: "0" }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="mySwiperJs"
      >
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide className="myimgcls" key={i}>
              <img src={img} alt="sliderImage" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default SliderImage;
