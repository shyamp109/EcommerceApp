import React from "react";
import {
  CardContent,
  Container,
  Button,
  Box,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import imgmedia from "../assets/images/product.jpg";
import styled from "@emotion/styled";
import {
  FavoriteBorderOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
export const ProductImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "50%",
  background: "lightgray",
  padding: "10px",
  marginTop: "15px",
  [theme.breakpoints.down("md")]: {
    width: "80%",
    padding: "24px",
  },
}));
function ProductList() {
  return (
    <>
      <Container sx={{ marginBottom: "50px" }}>
        <Typography
          color="otherColor"
          textAlign="left"
          mt={4}
          sx={{
            fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
          }}
          component="h3"
        >
          ProductDetails
        </Typography>

        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          }}
        >
          <ProductImage component="img" src={imgmedia} />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 500,
                lineHeight: 1.5,
              }}
            >
              <Typography variant="h5">$ 45000</Typography>
              <Typography variant="subtitle">
                Availability: 5 in stock
              </Typography>
              <Typography
                color="secondary"
                sx={{
                  lineHeight: 2,
                  fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
                }}
              >
                IPhone 13 Pro Max
              </Typography>
              <Typography color="otherColor" variant="body">
                A Dialog is a type of modal window that appears in front of app
                content to provide critical information or ask for a decision.
                Dialogs disable all app functionality when they appear, and
                remain on screen until confirmed, dismissed, or a required
                action has been taken.
              </Typography>
              <Box
                sx={{ mt: 4,
                display:"flex",
                alignItems:"center",
                justifyContent:"flex-start",
                gap:"15px",flexDirection:{xs:"column",sm:"row"} }}
              >
                <Button
                  startIcon={<ShoppingBagOutlined />}
                  color="secondary"
                  variant="contained"
                  sx={{ color: "white",width:"100%" }}
                >
                  Add to Cart
                </Button>
                <Button
                  startIcon={<FavoriteBorderOutlined />}
                  color="secondary"
                  variant="contained"
                  sx={{ color: "white",width:"100%" }}
                >
                  Add to Wishlist
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 4,
                  color: "gray",
                }}
              >
                <FacebookIcon color="secondary" />
                <TwitterIcon color="secondary" sx={{ pl: 2 }} />
                <InstagramIcon color="secondary" sx={{ pl: 2 }} />
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Container>
    </>
  );
}
export default ProductList;
