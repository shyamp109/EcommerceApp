import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import aboutimg from "../assets/images/slider1.jpg";
import { ReadMore, ShoppingBagSharp } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
const About = () => {
  const location = useLocation();
  const [pathName,setPathName] = useState(false);
  useEffect(() => {
    setPathName(ValidatePath(location.pathname));
  }, [location]);
  return (
    <Container sx={{ marginTop: "30px" }}>
      {pathName && 
          <>
            <Typography
            color="otherColor"
            textAlign="left"
            sx={{
              fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
            }}
            component="h3"
          >
            About Us
          </Typography>
          </>
        }
      <Box
        sx={{
          marginTop: "20px",
          marginBottom: "50px",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          },
          gap: "20px",
        }}
      >
        <img src={aboutimg} sx={{width:{sm:"100%",xs:"100%",md:"50%",lg:"50%"}}} height="400px" alt="aboutImage" />
        <Box>
          <Typography variant="h4" color="otherColor">
            Shoppwap for your amazination
          </Typography>
          <Typography
            sx={{ marginTop: "20px" }}
            color="otherColor"
            textAlign="left"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection:{xs:"column",sm:"row",md:"row",lg:"row"},
                gap: "20px",
                justifyContent: "flex-start",
              }}
            >
              <Button
                startIcon={<ShoppingBagSharp />}
                color="secondary"
                variant="outlined"
              >
                Best Clothes
              </Button>
              <Button
                startIcon={<ShoppingBagSharp />}
                color="secondary"
                variant="outlined"
              >
                Best Electronic Items
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection:{xs:"column",sm:"row",md:"row",lg:"row"},
                gap: "20px",
                justifyContent: "flex-start",
              }}
            >
              <Button
                startIcon={<ShoppingBagSharp />}
                color="secondary"
                variant="outlined"
              >
                Best Shoes
              </Button>

              <Button
                startIcon={<ShoppingBagSharp />}
                color="secondary"
                variant="outlined"
              >
                Best HouseHold Items
              </Button>
            </Box>
          </Box>
          <Button
            startIcon={<ReadMore />}
            color="secondary"
            variant="contained"
            sx={{ marginTop: "40px", color: "white" }}
          >
            Read more
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
