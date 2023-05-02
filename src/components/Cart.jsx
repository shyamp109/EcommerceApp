import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  Divider,
  ListItem,
  List,
  TextField,
} from "@mui/material";
import payment from "../assets/images/pngwing.com.png";
import styled from "@emotion/styled";
import {
  ArrowBack,
  DeleteForeverSharp,
  RemoveCircle,
  RemoveShoppingCart,
  Shop2Rounded,
} from "@mui/icons-material";

import { NavLink, useLocation } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import Loader from "./Loader";

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
function Cart() {
  const { data } = useContext(UserContaxt);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  const getCartData = async () => {
    setIsLoading(true);
    try {
      const params = data.user.id;
      const { data: cartData } = await api.cart.get(params);
      // console.log(cartData.usercart);
      setCart(cartData.usercart);
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCartData();
  }, []);
  useEffect(() => {
    let subTotal = cart.reduce((acc, item) => {
      return acc + item.Product.price * item.qty;
    }, 0);
    setSubtotal(subTotal);
    setTotal(subTotal + 100);
  }, [cart]);
  const decrementQty = (id) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = parseInt(item.qty) - 1;
        return {
          ...item,
          qty: newQty >= 1 ? newQty : 1,
        };
      }
      return item;
    });
    setCart(newCart);
  };

  const incrementQty = (id) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = parseInt(item.qty) + 1;
        return {
          ...item,
          qty: newQty >= 1 ? newQty : 1,
        };
      }
      return item;
    });
    setCart(newCart);
  };

  const handleRemoveFromCart = async (item) => {
    const params = {
      user_id: data.user.id,
      product_id: item,
    };
    try {
      const { data: updatedCart } = await api.cart.remove(params);
      enqueueSnackbar("Product Removed from Cart", { variant: "error" });
      getCartData();
    } catch (error) {
      console.error(error);
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
          mt={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
            gap: "20px",
            width: "full",
          }}
        >
          {cart.length > 0  ? (
            <>
              <Box
                sx={{
                  padding: "25px",
                  width: { sx: "full", sm: "full", md: "100%" },
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                  Shopping Cart
                </Typography>
                <Divider />
                <List sx={{ overflowX: "scroll" }}>
                  {cart?.map((cart) => (
                    <>
                      <ListItem
                        sx={{
                          padding: "10px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "10px",
                            width: "220px",
                          }}
                        >
                          <img
                            src={`https://ecommerceserver-4zw1.onrender.com/${cart.Product.image}`}
                            alt="img"
                            width="80px"
                            height="80px"
                          />
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "15px",
                                sm: "20px",
                                md: "20px",
                                xl: "20px",
                              },
                              fontWeight: 500,
                            }}
                          >
                            {cart.Product.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{ color: "white" }}
                            onClick={() => decrementQty(cart.id)}
                          >
                            -
                          </Button>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "15px",
                                sm: "20px",
                                md: "20px",
                                xl: "20px",
                              },
                              fontWeight: 500,
                            }}
                          >
                            {cart.qty}
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{ color: "white", width: "15px" }}
                            onClick={() => incrementQty(cart.id)}
                          >
                            +
                          </Button>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "15px",
                              sm: "20px",
                              md: "20px",
                              xl: "20px",
                            },
                            fontWeight: 500,
                            width: "100px",
                          }}
                        >
                          ${cart.Product.price}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "15px",
                              sm: "20px",
                              md: "20px",
                              xl: "20px",
                            },
                            fontWeight: 500,
                          }}
                        >
                          ${cart.Product.price * cart.qty}
                        </Typography>
                        <Box>
                          <Button
                            onClick={() =>
                              handleRemoveFromCart(cart.Product.id)
                            }
                          >
                            <DeleteForeverSharp
                              size="meduim"
                              sx={{ color: "red", cursor: "pointer" }}
                            />
                          </Button>
                        </Box>
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
                <Box
                  textAlign="right"
                  mt={1}
                  mb={1}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "20px",
                        md: "20px",
                        xl: "20px",
                      },
                      fontWeight: 500,
                    }}
                  >
                    Subtotal :
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "20px",
                        md: "20px",
                        xl: "20px",
                      },
                      fontWeight: 500,
                    }}
                  >
                    ${subtotal}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  textAlign="right"
                  mt={2}
                  mb={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: {
                      xs: "column-reverse",
                      sm: "row",
                      md: "row",
                    },
                    gap: "15px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    component={NavLink}
                    to="/product"
                    sx={{ color: "white" }}
                    startIcon={<ArrowBack />}
                  >
                    Continue Shopping
                  </Button>
                  {/* <button onClick={calculateTotal}>Calculate Total</button> */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: {
                        xs: "flex-end",
                        sm: "center",
                        md: "center",
                        lg: "center",
                      },
                      alignItems: {
                        xs: "flex-end",
                        sm: "center",
                        md: "center",
                        lg: "center",
                      },
                      flexDirection: "row",
                      gap: "25px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "20px",
                          md: "20px",
                          xl: "20px",
                        },
                        fontWeight: 500,
                      }}
                    >
                      Total :
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "20px",
                          md: "20px",
                          xl: "20px",
                        },
                        fontWeight: 500,
                      }}
                    >
                      ${total}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "full",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "10px",
                    padding: "25px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  }}
                >
                  <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                    Your Information
                  </Typography>
                  <Divider />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    color="secondary"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    color="secondary"
                    id="mobile"
                    label="Mobile number"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Box>
                <Box
                  sx={{
                    borderRadius: "10px",
                    padding: "25px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  }}
                >
                  <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                    Payment Option
                  </Typography>
                  <Divider />
                  <img
                    src={payment}
                    alt="img"
                    style={{ backgroundColor: "white", marginTop: "15px" }}
                    width="250px"
                    height="100px"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white", width: "100%", marginTop: "15px" }}
                    startIcon={<Shop2Rounded />}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                padding: "25px",
                width: { sx: "full", sm: "full", md: "100%" },
                height: "11vh",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                borderRadius: "10px",
              }}
            >
              <Typography>Cart is Empty.</Typography>
            </Box>
          )}
        </Box>
      </Container>
      <Loader open={isLoading} />
    </>
  );
}
export default Cart;
