import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";

import { Shop, ShoppingBag, ViewAgendaOutlined } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CategoryList from "../components/Category";
import { ValidatePath } from "../utills/helper";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails, fetchCartData } from "../redux/reducers/cartSlice";
import { setHeaderToken } from "../api/client";
import { fetchProduct } from "../redux/reducers/productSlice";
import { fetchProductDetail } from "../redux/reducers/productDetailsSlice";
import Loader from "../components/Loader";

function ProductList() {
  const { products, setProducts, productListRef, noProductsFound } =
    useContext(UserContaxt);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pathName, setPathName] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const product = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setPathName(ValidatePath(location.pathname));
    dispatch(fetchProduct());
  }, []);
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

  // const handleProductItemClick = (productId) => {
  //   setIsLoading(true);
  //   console.log("product id", productId);
  //   dispatch(fetchProductDetail(productId));
  //   setIsLoading(false);
  //   navigate("ProductDetails", { productId });
  // };
  return (
    <>
      <Container sx={{ marginBottom: "50px", marinTop: "25px" }}>
        <CategoryList />
        {pathName && (
          <>
            <Typography
              ref={productListRef}
              mt={3}
              color="otherColor"
              textAlign="left"
              sx={{
                fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
              }}
              component="h3"
            >
              Product List
            </Typography>
          </>
        )}

        <Grid ref={productListRef} container spacing={3} sx={{ paddingTop: 5 }}>
          {noProductsFound ? (
            <div>No products found.</div>
          ) : (
            <>
              {product?.productlist?.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      textDecoration: "none",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      src={`https://ecommerceserver-4zw1.onrender.com/${product.image}`}
                      alt={product.name}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="otherColor"
                          sx={{
                            fontWeight: 500,
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                          }}
                          variant="h6"
                        >
                          {product.name}
                        </Typography>

                        <Typography
                          color="otherColor"
                          variant="h5"
                          component="h6"
                        >
                          ${product.price}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: {
                            xs: "column",
                            sm: "column",
                            md: "row",
                            lg: "row",
                            xl: "row",
                          },
                          gap: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          startIcon={<ShoppingBag />}
                          color="secondary"
                          sx={{
                            color: "white",
                            width: {
                              xs: "100%",
                              sm: "100%",
                              md: "50%",
                              lg: "50%",
                              xl: "50%",
                            },
                          }}
                          variant="contained"
                          onClick={() => AddToCart(product.id)}
                        >
                          Add Cart
                        </Button>
                        <Button
                          startIcon={<ViewAgendaOutlined />}
                          component={NavLink}
                          to={`/productDetails/${product.id}`}
                          color="secondary"
                          variant="contained"
                          sx={{
                            color: "white",
                            width: {
                              xs: "100%",
                              sm: "100%",
                              md: "50%",
                              lg: "50%",
                              xl: "50%",
                            },
                          }}
                        >
                          View More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
        <Loader open={isLoading} />
      </Container>
    </>
  );
}
export default ProductList;
