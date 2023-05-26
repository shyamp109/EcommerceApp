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
  ShoppingBagSharp,
} from "@mui/icons-material";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../redux/reducers/cartSlice";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const { cart } = useSelector((state) => state.cartSlice);
  // console.log("cartData", cart.data);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCartData()).then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let subTotal = cart?.data?.reduce((acc, item) => {
      return acc + item?.product_id?.price * item.qty;
    }, 0);
    setSubtotal(subTotal);
    setTotal(subTotal + 100);
  }, [cart]);
  const decrementQty = async (id, qty) => {
    console.log(id, qty);
    let newQty = qty;
    if (qty > 1) {
      newQty -= 1;
      const data = {
        qty: newQty,
        id: id,
      };
      console.log(data);
      setIsLoading(true);
      try {
        const response = await api.cart.update(data);
        enqueueSnackbar("Product Quantity Updated", { variant: "success" });
        dispatch(fetchCartData());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Something Went Worng", { variant: "error" });
        setIsLoading(false);
      }
    }
  };
  const incrementQty = async (id, qty) => {
    console.log(id, qty);
    let newQty = parseInt(qty);
    if (newQty > 0) {
      newQty += 1;
      const data = {
        id: id,
        qty: newQty,
      };
      console.log(data);
      setIsLoading(true);
      try {
        const response = await api.cart.update(data);
        dispatch(fetchCartData());
        enqueueSnackbar("Product Quantity Updated", { variant: "success" });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        enqueueSnackbar("Something Went Worng", { variant: "error" });
      }
    }
  };


  const handleRemoveFromCart = async (item) => {
    const params = {
      product_id: item,
    };
    setIsLoading(true);
    try {
      const { data: updatedCart } = await api.cart.remove(params);
      dispatch(fetchCartData());
      enqueueSnackbar("Product Removed From Cart !!", { variant: "success" });
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleCheckOut = () => {
    navigate("/checkout", {
      state: {
        subtotal: subtotal,
        total: total,
        cartData: cart?.data.data,
      },
    });
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
          }}
        >
          {cart?.data?.length > 0 ? (
            <>
              <Box
                sx={{
                  padding: "25px",
                  flex: 1,
                  // width: { xs: "full", sm: "full", md: "100%" },
                  // boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  // borderRadius: "10px",
                }}
              >
                <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                  Shopping Cart
                </Typography>
                <Divider />
                <List sx={{ overflowX: "scroll" }}>
                  {cart?.data?.map((cart) => (
                    <>
                      <ListItem
                        sx={{
                          padding: {
                            xs: "20px",
                            sm: "20px",
                            md: "10px",
                            lg: "10px",
                            xl: "10px",
                          },
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
                            gap: {
                              xs: "20px",
                              sm: "20px",
                              md: "10px",
                              lg: "10px",
                              xl: "10px",
                            },
                            width: "220px",
                          }}
                        >
                          <img
                            src={`https://ecommerce-server-le5a.onrender.com/${cart?.product_id?.image}`}
                            alt="img"
                            width="80px"
                            height="80px"
                          />
                          <Typography
                            sx={{
                              fontWeight: 500,
                              display: "-webkit-box",
                              overflow: "hidden",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 1,
                              fontSize: {
                                xs: "15px",
                                sm: "20px",
                                md: "20px",
                                xl: "20px",
                              },
                            }}
                          >
                            {cart?.product_id?.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: {
                              xs: "20px",
                              sm: "20px",
                              md: "10px",
                              lg: "10px",
                              xl: "10px",
                            },
                            gap: {
                              xs: "20px",
                              sm: "20px",
                              md: "10px",
                              lg: "10px",
                              xl: "10px",
                            },
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{
                              color: "white",
                              minWidth: "35px",
                            }}
                            onClick={() => decrementQty(cart?._id, cart?.qty)}
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
                            {cart?.qty}
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            style={{ color: "white", minWidth: "35px" }}
                            onClick={() => incrementQty(cart?._id, cart?.qty)}
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
                            paddingLeft: {
                              xs: "20px",
                              sm: "20px",
                              md: "10px",
                              lg: "10px",
                              xl: "10px",
                            },
                            fontWeight: 500,
                            width: "100px",
                          }}
                        >
                          ${cart?.product_id.price}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "15px",
                              sm: "20px",
                              md: "20px",
                              xl: "20px",
                            },
                            paddingLeft: { xs: "20px", sm: "20px", md: "10px" },
                            fontWeight: 500,
                          }}
                        >
                          ${cart?.product_id?.price * cart?.qty}
                        </Typography>
                        <Box>
                          <Button
                            onClick={() =>
                              handleRemoveFromCart(cart?.product_id?._id)
                            }
                          >
                            <DeleteForeverSharp
                              size="meduim"
                              sx={{ color: "red", cursor: "pointer" }}
                            />
                          </Button>
                        </Box>
                      </ListItem>
                      <Divider variant="fullWidth" />
                    </>
                  ))}
                </List>
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
                      SubTotal : ${subtotal}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "3px",
                    padding: "20px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  }}
                >
                  <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                    Price Details
                  </Typography>
                  <Divider />
                  <Box
                    mt={2}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      flexDirection: "row",
                      gap: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          xl: "18px",
                        },
                        fontWeight: 500,
                      }}
                    >
                      SubTotal :
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          xl: "18px",
                        },
                        fontWeight: 500,
                      }}
                    >
                      ${subtotal}
                    </Typography>
                  </Box>

                  <Box
                    mt={2}
                    mb={1}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      flexDirection: "row",
                      gap: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          xl: "18px",
                        },
                        fontWeight: 500,
                      }}
                    >
                      Shipping:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          xl: "18px",
                        },
                        fontWeight: 500,
                      }}
                    >
                      $100
                    </Typography>
                  </Box>
                  <Divider />
                  <Box
                    mt={2}
                    mb={2}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      flexDirection: "row",
                      gap: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          xl: "18px",
                        },
                        fontWeight: 600,
                      }}
                    >
                      Total:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          xl: "18px",
                        },
                        fontWeight: 600,
                      }}
                    >
                      ${total}
                    </Typography>
                  </Box>
                  <Divider />
                  <Button
                    onClick={() => handleCheckOut()}
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white", marginTop: "10px", width: "100%" }}
                    startIcon={<ShoppingBagSharp />}
                  >
                    Proceed To CheckOut
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                padding: "25px",
                width: "100%",
                height: "11vh",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                borderRadius: "3px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: {
                    xs: "18px",
                    sm: "18px",
                    md: "18px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Cart is Empty.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component={NavLink}
                to="/product"
                sx={{ color: "white" }}
                startIcon={<ArrowBack />}
              >
                Go To Shopping
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <Loader open={isLoading} />
    </>
  );
}
export default Cart;
