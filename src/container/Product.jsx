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
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Shop, ShoppingBag, ViewAgendaOutlined } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CategoryList from "../components/Category";
import { ValidatePath } from "../utills/helper";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  cartDetails,
  fetchCartData,
} from "../redux/reducers/cartSlice";
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
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of products to display per page
  const [sortOrder, setSortOrder] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const data = "";
    setPathName(ValidatePath(location.pathname));
    dispatch(fetchProduct())
      .then((response) => {
        setSortOrder(response.payload);
        // console.log(response.payload);
        setPaginatedProducts(response.payload.slice(0, pageSize));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

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
  const handlePageChange = (event, page) => {
    const newStartIndex = (page - 1) * pageSize;
    const newEndIndex = page * pageSize;
    setPaginatedProducts(sortOrder.slice(newStartIndex, newEndIndex));
    setCurrentPage(page);
  };
  const handleProductDetail = (id) => {
    navigate("/productDetails", {
      state: {
        productId: id,
      },
    });
  };
  const handleAsendingData = () => {
    const sortedProducts = [...product].sort((a, b) => a.price - b.price);
    setSortOrder(sortedProducts);
    setPaginatedProducts(sortedProducts.slice(0, pageSize));
    setCurrentPage(1);
  };
  const handleDescendingData = () => {
    const sortedProducts = [...product].sort((a, b) => b.price - a.price);
    setSortOrder(sortedProducts);
    setPaginatedProducts(sortedProducts.slice(0, pageSize));
    setCurrentPage(1);
  };

  return (
    <>
      <Container sx={{ marginBottom: "50px", marinTop: "25px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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

          <FormControl color="secondary">
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem onClick={handleAsendingData} value="asc">
                Low to High
              </MenuItem>
              <MenuItem onClick={handleDescendingData} value="desc">
                High to Low
              </MenuItem>
            </Select>
          </FormControl>
        </div>

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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil(sortOrder?.length / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
        <Loader open={isLoading} />
      </Container>
    </>
  );
}
export default ProductList;
