import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
  Pagination,
} from "@mui/material";

import { ShoppingBag, ViewAgendaOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../redux/reducers/cartSlice";
import { setHeaderToken } from "../api/client";

import Loader from "../components/Loader";
import { fetchCategoryProduct } from "../redux/reducers/categorySlice";
const CategoryListProduct = () => {
  const categoryProduct = useSelector((state) => state.categoryProduct);
  const { products, setProducts, productListRef, noProductsFound } =
    useContext(UserContaxt);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pathName, setPathName] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const product = useSelector((state) => state.productList);
  const { categoryName } = location.state;
  const dispatch = useDispatch();

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of products to display per page

  const handlePageChange = (event, page) => {
    const newStartIndex = (page - 1) * pageSize;
    const newEndIndex = page * pageSize;
    setPaginatedProducts(categoryProduct.slice(newStartIndex, newEndIndex));
    setCurrentPage(page);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setPathName(ValidatePath(location.pathname));
    dispatch(fetchCategoryProduct(categoryName))
      .then((response) => {
        setPaginatedProducts(response.payload.slice(0, pageSize));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  const AddToCart = async (product) => {
    try {
      const params = {
        user_id: user?.user.id,
        product_id: product,
      };
      setIsLoading(true);
      const { data: cartData } = await api.cart.add(params);
      dispatch(fetchCartData(user?.user.id));
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
  const handleProductDetail = (id) => {
    navigate("/productDetails", {
      state: {
        productId: id,
      },
    });
  };
  console.log("cat", categoryProduct);
  return (
    <Container sx={{ marginBottom: "50px", marinTop: "25px" }}>
      <Typography
        ref={productListRef}
        mt={3}
        color="secondary"
        textAlign="left"
        sx={{
          fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
        }}
        component="h3"
      >
        Product List
      </Typography>

      <Grid ref={productListRef} container spacing={3} sx={{ paddingTop: 5 }}>
        {noProductsFound ? (
          <div>No products found.</div>
        ) : (
          <>
            {paginatedProducts?.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    textDecoration: "none",
                    borderColor: "#D2AB09",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                        padding: 5,
                      }}
                      src={`https://ecommerce-server-le5a.onrender.com/${item.image}`}
                      alt={item.name}
                    />
                  </div>
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
                          WebkitLineClamp: 1,
                        }}
                        variant="h6"
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        color="otherColor"
                        variant="h5"
                        component="h6"
                      >
                        ₹{item.price}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "column",
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
                          },
                        }}
                        variant="contained"
                        onClick={() => AddToCart(item._id)}
                      >
                        Add Cart
                      </Button>
                      <Button
                        startIcon={<ViewAgendaOutlined />}
                        onClick={() => handleProductDetail(item._id)}
                        color="secondary"
                        variant="contained"
                        sx={{
                          color: "white",
                          width: {
                            xs: "100%",
                            sm: "100%",
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
      {categoryProduct?.length > pageSize && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil(categoryProduct.length / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={0}
          />
        </Box>
      )}
      <Loader open={isLoading} />
    </Container>
  );
};

export default CategoryListProduct;
