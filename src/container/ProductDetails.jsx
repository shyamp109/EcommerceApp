import React, { useContext, useEffect, useState } from "react";
import { CardContent, Container, Button, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import {
  FavoriteBorderOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
import ProductQuantity from "../components/ProductQuantity";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../redux/reducers/productDetailsSlice";
import { fetchCartData } from "../redux/reducers/cartSlice";
import Loader from "../components/Loader";
import Breadcrumb from "../components/Breadcrumbs";
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
  const {
    handleSearchChange,
    searchItem,
    setSearchItem,
    suggestions,
    search,
    setSearch,
  } = useContext(UserContaxt);
  const location = useLocation();
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const { productId } = location.state;
  const product = useSelector((state) => state.productDetailsSlice);
  console.log("user", product?.data?.Product?.name);
  const dispatch = useDispatch();
  const getProductDetails = () => {
    dispatch(fetchProductDetail(productId)).then(() => setIsLoading(false));
  };
  useEffect(() => {
    setIsLoading(true);
    getProductDetails();
  }, [search]);
  if (!product) {
    return <div>Loading...</div>;
  }
  const AddToCart = async (product) => {
    try {
      const values = {
        product_id: product,
      };
      setIsLoading(true);
      const { data } = await api.cart.add(values);
      dispatch(fetchCartData());
      console.log(data);
      setIsLoading(false);
      enqueueSnackbar("Product is added into cart", { variant: "success" });
      setIsLoading(false);
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
            src={`https://ecommerce-server-le5a.onrender.com/${product?.data?.Product?.image}`}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "50%",
                lg: "50%",
                xl: "50%",
              },
              height: "350px",
              objectFit: "contain",
              borderRadius: "10px",
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
              <Typography variant="h5">
                ₹{product?.data?.Product?.price}
              </Typography>
              <Typography variant="subtitle">
                Availability: {product?.data?.Product?.stock} in stock
              </Typography>
              <Typography
                color="secondary"
                sx={{
                  lineHeight: 2,
                  fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
                }}
              >
                {product?.data?.Product?.name}
              </Typography>
              <Typography
                color="otherColor"
                variant="body"
                sx={{
                  fontSize: { xs: "12px", sm: "12px", md: "15px", xl: "15px" },
                }}
              >
                {product?.data?.Product?.desc}
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
                  onClick={() => AddToCart(product?.data?.Product?._id)}
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
