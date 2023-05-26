import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import paypal from "../assets/images/paypal (1).png";
import cash from "../assets/images/pngwing.com (1).png";
import online from "../assets/images/pngwing.com.png";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { ValidatePath } from "../utills/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBagSharp } from "@mui/icons-material";
import { api } from "../api";
import { enqueueSnackbar } from "notistack";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import styled from "@emotion/styled";
import { theme } from "../utills/theme";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
});
const Checkout = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { subtotal, total, cartData } = location.state;
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  const [phoneError, setPhoneError] = React.useState(false);
  const [addError, setAddError] = React.useState(false);
  const [cityError, setCityError] = React.useState(false);
  const [stateError, setStateError] = React.useState(false);
  const [pcodeError, setPcodeError] = React.useState(false);
  const [houseError, setHouseError] = React.useState(false);

  const handlePhoneChange = (event) => {
    if (!event.target.value) {
      setPhoneError("Phone number is required.");
    } else {
      setPhoneError(false);
    }
  };
  const handleAddressChange = (event) => {
    if (!event.target.value) {
      setAddError("Address is required.");
    } else {
      setAddError(false);
    }
  };
  const handleHouseChange = (event) => {
    if (!event.target.value) {
      setHouseError("Address is required.");
    } else {
      setHouseError(false);
    }
  };
  const handleCityChange = (event) => {
    if (!event.target.value) {
      setCityError("City is required.");
    } else {
      setCityError(false);
    }
  };
  const handleStateChange = (event) => {
    if (!event.target.value) {
      setStateError("State is required.");
    } else {
      setStateError(false);
    }
  };
  const handlePcodeChange = (event) => {
    if (!event.target.value) {
      setPcodeError("PostCode is required.");
    } else {
      setPcodeError(false);
    }
  };
  const handleOrderPlace = async (event) => {
    event.preventDefault();
    // console.log("handleOrderPlace called");
    const data = new FormData(event.currentTarget);
    const fname = data.get("firstName");
    const lname = data.get("lastName");
    const email = data.get("email");
    const city = data.get("city");
    const state = data.get("state");
    const address1 = data.get("add1");
    const address2 = data.get("add2");
    const postcode = data.get("pcode");
    const phone = data.get("phone");

    if (!phone) {
      setPhoneError("Phone number is required.");
    } else {
      setPhoneError(false);
    }

    if (!address1) {
      setAddError("Address is required.");
    } else {
      setAddError(false);
    }

    if (!address2) {
      setHouseError("Address is required.");
    } else {
      setHouseError(false);
    }

    if (!city) {
      setCityError("City is required.");
    } else {
      setCityError(false);
    }

    if (!state) {
      setStateError("State is required.");
    } else {
      setStateError(false);
    }

    if (!postcode) {
      setPcodeError("PostCode is required.");
    } else {
      setPcodeError(false);
    }
    if (phone && city && state && address1 && address2 && postcode) {
      console.log("called");
      try {
        const { data } = await api.order.add();
        console.log(data);
        enqueueSnackbar("Order Placed successfully", { variant: "success" });
        navigate("/orders");
      } catch (error) {
        enqueueSnackbar("Something went wrong", { variant: "error" });
        console.log(error);
      }
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
        <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
          Billing Details
        </Typography>
        <Divider />

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
          component="form"
          noValidate
          onSubmit={handleOrderPlace}
        >
          <Box
            sx={{
              flex: 0.7,
              height: "fit-content",
            }}
          >
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    First Name
                  </Typography>
                  <CssTextField
                    color="secondary"
                    sx={{ borderColor: "red" }}
                    autoComplete="given-name"
                    name="firstName"
                    disabled
                    required
                    fullWidth
                    id="firstName"
                    placeholder="FirstName"
                    value={user.data.user.firstName}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    Last Name:
                  </Typography>
                  <CssTextField
                    required
                    fullWidth
                    disabled
                    color="secondary"
                    id="lastName"
                    placeholder="Last Name"
                    name="lastName"
                    value={user.data.user.lastName}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    Email Address
                  </Typography>
                  <CssTextField
                    required
                    disabled
                    fullWidth
                    color="secondary"
                    id="email"
                    placeholder="Email Address"
                    name="email"
                    value={user.data.user.email}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    Phone Number
                  </Typography>
                  <CssTextField
                    required
                    fullWidth
                    color="secondary"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="Phone number"
                    error={Boolean(phoneError)}
                    onChange={handlePhoneChange}
                    helperText={phoneError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    State / Country
                  </Typography>
                  <CssTextField
                    required
                    fullWidth
                    color="secondary"
                    id="state"
                    placeholder="State/Country"
                    error={Boolean(stateError)}
                    onChange={handleStateChange}
                    helperText={stateError}
                    name="state"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    Street Address
                  </Typography>
                  <CssTextField
                    required
                    fullWidth
                    name="add1"
                    placeholder="House number and street name"
                    id="add1"
                    autoComplete="address"
                    color="secondary"
                    error={Boolean(addError)}
                    onChange={handleAddressChange}
                    helperText={addError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    House Number ,BuildingName
                  </Typography>
                  <CssTextField
                    required
                    fullWidth
                    name="add2"
                    placeholder="Appartment,suite,unit etc:(optional)"
                    id="add2"
                    autoComplete="address"
                    color="secondary"
                    error={Boolean(houseError)}
                    onChange={handleHouseChange}
                    helperText={houseError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    City / Town
                  </Typography>
                  <CssTextField
                    color="secondary"
                    sx={{ borderColor: "red" }}
                    autoComplete="given-name"
                    name="city"
                    required
                    fullWidth
                    id="city"
                    placeholder="Town/City"
                    error={Boolean(cityError)}
                    onChange={handleCityChange}
                    helperText={cityError}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color="otherColor"
                    textAlign="left"
                    mb={1}
                    sx={{
                      fontSize: {
                        xs: "18px",
                      },
                    }}
                    component="h3"
                  >
                    Postcode / Zip*
                  </Typography>
                  <CssTextField
                    required
                    fullWidth
                    color="secondary"
                    id="pcode"
                    placeholder="PostCode/Zip"
                    error={Boolean(pcodeError)}
                    onChange={handlePcodeChange}
                    helperText={pcodeError}
                    name="pcode"
                    autoComplete="family-name"
                  />
                </Grid>
              </Grid>
            </div>
          </Box>
          <Box
            sx={{
              flex: 0.3,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                borderRadius: "2px",
                padding: "24px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
            >
              <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                Your Order
              </Typography>
              <Divider />
              {/* <Box
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
                    fontWeight: 700,
                  }}
                >
                  Products
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "18px",
                      md: "18px",
                      xl: "18px",
                    },
                    fontWeight: 700,
                  }}
                >
                  Total
                </Typography>
              </Box>

              <Box>
                {cartData?.usercart?.map((cart) => (
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
                      {cart.Product.name}
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
                      x {cart.qty}
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
                      ${cart.Product.price}
                    </Typography>
                  </Box>
                ))}
              </Box> */}
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
                    fontWeight: 700,
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
                    fontWeight: 700,
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
            </Box>
            <Box
              sx={{
                borderRadius: "2px",
                padding: "24px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
            >
              <Box
                mt={2}
                mb={1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  flexDirection: "column",
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
                    fontWeight: 700,
                  }}
                >
                  Payment Options
                </Typography>
                <Box
                  mt={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="radio"
                      id="paypal"
                      name="payment-option"
                      value="paypal"
                    />
                    <label for="paypal">Direct Bank Transfer</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="radio"
                      id="online"
                      name="payment-option"
                      value="online"
                    />
                    <label for="online">Check Payment</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="radio"
                      id="cash"
                      name="payment-option"
                      value="cash"
                    />
                    <label for="cash">Paypal</label>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      name="termsCheckbox"
                    />
                    <label for="termsCheckbox">
                      I have read and accept the terms and conditions
                    </label>
                  </div>
                </Box>
              </Box>
              <Button
                type="submit"
                // onClick={() => handleOrderPlace()}
                variant="contained"
                color="secondary"
                sx={{ color: "white", marginTop: "10px", width: "100%" }}
                startIcon={<ShoppingBagSharp />}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Loader open={isLoading} />
    </>
  );
};

export default Checkout;
