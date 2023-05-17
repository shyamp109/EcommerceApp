import React, { useContext, useEffect, useState } from "react";
import { CardContent, Container, Button, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import {
  FavoriteBorderOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { ValidatePath } from "../utills/helper";
import ProductQuantity from "../components/ProductQuantity";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../redux/reducers/productDetailsSlice";
import { fetchCartData } from "../redux/reducers/cartSlice";
import Loader from "../components/Loader";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const product = useSelector(state => state.productDetailsSlice);
  const dispatch = useDispatch();
  const getProductDetails = () =>{
    dispatch(fetchProductDetail(id,user.user.id)).then(()=>setIsLoading(false));
  }
  useEffect(() => {
    setIsLoading(true);
    getProductDetails();
  }, []);
  if (!product) {
    return <div>Loading...</div>;
  }
  const AddToCart = async (product) => {
    try {
      const params = {
        user_id: user?.user.id,
        product_id: product,
      };
      setIsLoading(true);   
      const { data: cartData } = await api.cart.add(params);
      dispatch(fetchCartData(user?.user.id))
      setIsLoading(false);
      if (cartData.status !== 200) {
        enqueueSnackbar("Add Product to Cart Successfully", {
          variant: "success",
        });
        setIsLoading(false);
      } else {
        enqueueSnackbar("Product is already in cart", { variant: "error" });
        setIsLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
      setIsLoading(false);
    }
  };
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
            src={`https://ecommerceserver-4zw1.onrender.com/${product?.product?.image}`}
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
              <Typography variant="h5">$ {product?.product?.price}</Typography>
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
                {product?.product?.name}
              </Typography>
              <Typography color="otherColor" variant="body" sx={{fontSize: { xs: "12px", sm: "12px", md: "15px", xl: "15px" }}}>
              orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </Typography>
              
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
                  onClick={() => AddToCart(product.id)}
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
        <Loader open={isLoading} />
      </Container>
    </>
  );
}
export default ProductDetails;
