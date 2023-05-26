import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
// import { Paper } from "@mui/material";
import cat1 from "../assets/images/mens.png";
import cat2 from "../assets/images/womens.png";
import cat3 from "../assets/images/kids.png";
import cat4 from "../assets/images/footware.png";
import cat5 from "../assets/images/beuty.png";
import cat6 from "../assets/images/electronic.png";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper";
import SwiperCore, { EffectCoverflow } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../App.css";
import { Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProduct } from "../redux/reducers/categorySlice";

SwiperCore.use([EffectCoverflow, Pagination]);
// if you want to use array
const categories = [
  { id: 1, image: cat1, categoryName: "Men's wear" },
  { id: 2, image: cat2, categoryName: "Women's wear" },
  { id: 3, image: cat3, categoryName: "Kid's wear" },
  { id: 4, image: cat4, categoryName: "Footwear" },
  { id: 5, image: cat5, categoryName: "Cosmetics" },
  { id: 6, image: cat6, categoryName: "Electronics" },
];
function CategorySwiper() {
  const location = useLocation();
  const [pathName, setPathName] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    setPathName(ValidatePath(location.pathname));
  }, [location]);
  const handleGetCategoryProduct = (cname) => {
    console.log("cname", cname);
    dispatch(fetchCategoryProduct(cname));
    navigate("/categoryProduct", {
      state: {
        categoryName: cname,
      },
    });
  };
  return (
    <>
      <Container>
        {pathName && (
          <>
            <Typography
              mt={3}
              color="secondary"
              textAlign="left"
              sx={{
                fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
              }}
              component="h3"
            >
              Category List
            </Typography>
          </>
        )}
      </Container>
      <>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          {categories.map((img, i) => {
            return (
              // <SwiperSlide key={i}>
              <div
                onClick={() => handleGetCategoryProduct(img.categoryName)}
                key={img.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{ width: "200px", height: "200px" }}
                  src={img.image}
                  alt="catImg"
                />
                <Typography
                  mt={3}
                  color="otherColor"
                  textAlign="left"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "20px",
                      md: "25px",
                      xl: "25px",
                    },
                  }}
                  component="h6"
                >
                  {img.categoryName}
                </Typography>
              </div>
              // </SwiperSlide>
            );
          })}
        </Box>
        {/* </Swiper> */}
      </>
    </>
  );
}

export default CategorySwiper;
