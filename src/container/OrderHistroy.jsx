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
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableHead,
  Pagination,
} from "@mui/material";
import payment from "../assets/images/pngwing.com.png";
import styled from "@emotion/styled";
import {
  ArrowBack,
  DeleteForeverSharp,
  PictureAsPdfOutlined,
  RemoveCircle,
  RemoveShoppingCart,
  Shop2Rounded,
  ShoppingBagSharp,
} from "@mui/icons-material";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
import { api } from "../api";
import { UserContaxt } from "../layout/MainLayout";
import { enqueueSnackbar } from "notistack";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../redux/reducers/cartSlice";
import { fetchOrderHistroy } from "../redux/reducers/orderHistrory";

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
const OrderHistroy = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  const { orderHistroyData } = useSelector((state) => state.orderHistroy);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  useEffect(() => {
    dispatch(fetchOrderHistroy())
      .then((response) => {
        setPaginatedProducts(response.payload.slice(0, pageSize));
      })
      .catch((error) => {
        console.error("Error fetching OrderData:", error);
      });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const handlePageChange = (event, page) => {
    const newStartIndex = (page - 1) * pageSize;
    const newEndIndex = page * pageSize;
    setPaginatedProducts(orderHistroyData.slice(newStartIndex, newEndIndex));
    setCurrentPage(page);
  };
  // console.log("data", orderHistroyData);
  const formatDate = (dateTime) => {
    const formattedDate = new Date(dateTime).toLocaleDateString();
    const formattedTime = new Date(dateTime).toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  const calculateTotal = (orderDetails) => {
    let total = 0;
    orderDetails.forEach((orderDetail) => {
      const productTotal = orderDetail.product_id.price * orderDetail.qty;
      total += productTotal;
    });
    return total;
  };

  const handleProductDetail = (id) => {
    navigate("/productDetails", {
      state: {
        productId: id,
      },
    });
  };

  const handleOrderInvoice = (id) => {
    navigate("/orderInvoice", { state: { order_id: id } });
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
          <>
            <Box
              sx={{
                padding: "25px",
                flex: 1,
              }}
            >
              <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                My Orders
              </Typography>
              <Divider />
              <List sx={{ overflowX: "scroll", padding: "5px" }}>
                {paginatedProducts?.map((order) => (
                  <Box
                    key={order._id}
                    sx={{
                      mt: 3,
                      padding: "25px",
                      borderColor: "#D2AB09",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: {
                            xs: "15px",
                            sm: "20px",
                            md: "20px",
                            xl: "20px",
                          },
                        }}
                      >
                        Order ID: {order.order._id}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: {
                            xs: "15px",
                            sm: "20px",
                            md: "20px",
                            xl: "20px",
                          },
                        }}
                      >
                        Order Date: {formatDate(order.order.createdAt)}
                      </Typography>
                    </div>

                    <Table sx={{ mt: 2 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Image</TableCell>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>subTotal</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order?.orderDetails?.map((orderDetail) => (
                          <TableRow key={orderDetail._id}>
                            <TableCell
                              onClick={() =>
                                handleProductDetail(orderDetail.product_id._id)
                              }
                            >
                              <img
                                src={`https://ecommerce-server-le5a.onrender.com/${orderDetail.product_id.image}`}
                                alt={orderDetail.product_id.name}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </TableCell>
                            <TableCell>{orderDetail.product_id.name}</TableCell>
                            <TableCell>{orderDetail.qty} x</TableCell>
                            <TableCell>
                              ${orderDetail.product_id.price}
                            </TableCell>
                            <TableCell>
                              ${orderDetail.product_id.price * orderDetail.qty}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={4} align="right">
                            <Button
                              startIcon={<PictureAsPdfOutlined />}
                              color="secondary"
                              sx={{
                                color: "white",
                              }}
                              variant="contained"
                              onClick={() => {
                                handleOrderInvoice(order);
                              }}
                            >
                              View Invoice
                            </Button>
                          </TableCell>
                          <TableCell colSpan={4} align="right">
                            <Typography variant="subtitle1" fontWeight="bold">
                              Total:
                            </Typography>
                          </TableCell>
                          <TableCell>
                            ${calculateTotal(order.orderDetails) + 100}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={Math.ceil(orderHistroyData?.length / pageSize)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            </Box>
          </>
        </Box>
      </Container>
      <Loader open={isLoading} />
    </>
  );
};

export default OrderHistroy;
