import * as React from 'react';
import Box from '@mui/material/Box';
import img1 from "../assets/images/slider1.jpg";
import img2 from "../assets/images/slider2.jpg";
import img3 from "../assets/images/slider3.jpg";
import img4 from "../assets/images/slider4.jpg";
import { Swiper,SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination,Autoplay } from "swiper";
import "../../src/index.css";
const slide_img = [img1,img2,img3,img4];


function SliderImage() {
  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      
      <Swiper
          style={{marginTop:"0",marginBotton:"0"}}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiperJs"
      >
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img className='' src={img} alt="sliderImage" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default SliderImage;