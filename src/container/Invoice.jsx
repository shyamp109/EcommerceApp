import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Divider,
  List,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ValidatePath } from "../utills/helper";
import { PictureAsPdfOutlined } from "@mui/icons-material";
import cat6 from "../assets/images/invoice.png";
const InvoiceOrder = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const { order_id } = location.state;

  const { user } = useSelector((state) => state.auth);
  console.log(user.data.user.firstName);
  const pathName = ValidatePath({ path });
  const order = location.state.order;
  const [loader, setLoader] = useState(false);

  const formatDate = (dateTime) => {
    const formattedDate = new Date(dateTime).toLocaleDateString();
    const formattedTime = new Date(dateTime).toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  const calculateTotal = (orderDetails) => {
    let total = 0;
    orderDetails?.forEach((orderDetail) => {
      const productTotal = orderDetail?.product_id?.price * orderDetail?.qty;
      total += productTotal;
    });
    return total;
  };

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture, {
      useCORS: true,
      onclone: (document) => {
        const images = document.querySelectorAll("img");
        const promises = Array.from(images).map((image) => {
          if (!image.complete) {
            return new Promise((resolve, reject) => {
              image.addEventListener("load", resolve);
              image.addEventListener("error", reject);
            });
          }
        });
        return Promise.all(promises);
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
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
          <>
            <Box
              sx={{
                padding: "25px",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
                  Order Invoice
                </Typography>
                <Button
                  startIcon={<PictureAsPdfOutlined />}
                  color="secondary"
                  sx={{
                    color: "white",
                  }}
                  variant="contained"
                  onClick={downloadPDF}
                >
                  Download Invoice
                </Button>
              </div>
              <Divider />
              <div className="actual-receipt">
                <List sx={{ overflowX: "scroll", padding: "5px" }}>
                  <Box
                    key={order_id.order._id}
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
                        padding: "10px",
                        backgroundColor: "#E6B713",
                      }}
                    >
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={cat6}
                        alt="catImg"
                      />
                      <label
                        style={{
                          flexGrow: 1,
                          marginBottom: "10px",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "28px",
                          color: "white",
                        }}
                      >
                        Shopping Invoice
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          marginBottom: "10px",
                          backgroundColor: "#E6B713",
                          color: "white",
                        }}
                      >
                        <label
                          style={{
                            flexGrow: 1,
                            marginBottom: "10px",
                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          Shopwapp E-commerce
                        </label>
                        <label
                          style={{
                            flexGrow: 1,
                            marginBottom: "10px",
                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          Shopping Site
                        </label>

                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          Ahmedabad
                        </label>

                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          gujrat
                        </label>
                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          382480
                        </label>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                        padding: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          Order ID: {order_id.order._id}
                        </label>
                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          Order Date: {formatDate(order_id.order.createdAt)}
                        </label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          Customer Name : {user.data.user.firstName}
                        </label>
                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          Customer LastName :{user.data.user.lastName}
                        </label>
                        <label
                          style={{
                            flexGrow: 1,

                            textDecoration: "none",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          Customer Email :{user.data.user.email}
                        </label>
                      </div>
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
                        {order_id?.orderDetails.map((orderDetail) => (
                          <TableRow key={orderDetail?._id}>
                            <TableCell>
                              <img
                                src={`https://ecommerce-server-le5a.onrender.com/${orderDetail?.product_id?.image}`}
                                alt={orderDetail?.product_id?.name}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </TableCell>
                            <TableCell>
                              {orderDetail?.product_id?.name}
                            </TableCell>
                            <TableCell>{orderDetail?.qty} x</TableCell>
                            <TableCell>
                              ${orderDetail?.product_id?.price}
                            </TableCell>
                            <TableCell>
                              $
                              {orderDetail?.product_id?.price *
                                orderDetail?.qty}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={4} align="right">
                            <Typography variant="subtitle1" fontWeight="bold">
                              Total:
                            </Typography>
                          </TableCell>
                          <TableCell>
                            ${calculateTotal(order_id?.orderDetails) + 100}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </List>
              </div>
            </Box>
          </>
        </Box>
      </Container>
      <Loader open={isLoading} />
    </>
  );
};

export default InvoiceOrder;
