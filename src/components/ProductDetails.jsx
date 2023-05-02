import React, { useEffect, useState } from "react";
import { CardContent, Container, Button, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import {
  FavoriteBorderOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { ValidatePath } from "../utills/helper";
import ProductQuantity from "./ProductQuantity";
import { api } from "../api";
export const ProductImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "50%",
  marginTop: "15px",
  [theme.breakpoints.down("md")]: {
    width: "80%",
    padding: "24px",
  },
}));
function ProductDetails() {
  const location = useLocation();
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);
  const productListData = async () => {
    const {data} = await api.product.getProductById(id);
    setProduct(data.product)
    console.log(data.product);
  }

  useEffect( () => {
    productListData();
  },[]);
  // useEffect(() => {
  //   fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data));
  // }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // console.log(product)
  return (
    <>
      <Container sx={{ marginBottom: "50px" }}>
        {pathName && (
          <>
            <Typography
              color="otherColor"
              textAlign="left"
              sx={{
                fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
              }}
              component="h3"
            >
              {pathName}
            </Typography>
          </>
        )}

        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          }}
        >
          <Box
            component="img"
            src={`https://ecommerceserver-4zw1.onrender.com/${product.image}`}
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%", lg: "50%", xl: "50%" },
              height: "350px",
              objectFit:"contain",
              borderRadius:"10px",
              marginTop: "15px",
            }}
          />
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
              <Typography variant="h5">$ {product.price}</Typography>
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
                {product.title}
              </Typography>
              <Typography color="otherColor" variant="body" sx={{fontSize: { xs: "12px", sm: "12px", md: "15px", xl: "15px" }}}>
              orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </Typography>
              <ProductQuantity />
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "15px",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  startIcon={<ShoppingBagOutlined />}
                  color="secondary"
                  variant="contained"
                  sx={{ color: "white", width: "100%" }}
                >
                  Cart
                </Button>
                <Button
                  startIcon={<FavoriteBorderOutlined />}
                  color="secondary"
                  variant="contained"
                  sx={{ color: "white", width: "100%" }}
                >
                  Wishlist
                </Button>
              </Box>

            </Box>
          </CardContent>
        </Box>
      </Container>
    </>
  );
}
export default ProductDetails;
