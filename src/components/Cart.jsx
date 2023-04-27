import React from "react";
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

import imgmedia from "../assets/images/product.jpg";
import payment from "../assets/images/pngwing.com.png";
import styled from "@emotion/styled";
import {
    ArrowBack,
  RemoveCircle,
  Shop2Rounded,
  
} from "@mui/icons-material";
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
  return (
    <>
      <Container sx={{ marginBottom: "50px" }}>
        <Typography
         color="otherColor"
         textAlign="left"
         mt={4}
         sx={{
           fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
         }}
         component="h3"
        >
          Cart
        </Typography>

        <Box sx={{ display: "flex",justifyContent:"space-between",flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },gap:"20px",width:"full" }}>
          <Box sx={{padding: "25px",width:{sx:"full",sm:"full",md:"100%"},boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)"}}>
            <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
              Shopping Cart
            </Typography>
            <Divider />
            <List>
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
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={imgmedia} alt="img" width="80px" height="80px" />
                  <Typography sx={{ fontSize: { xs: "15px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>
                    Iphone 13 Pro Max
                  </Typography>
                </Box>
                <RemoveCircle />
                <Typography sx={{ fontSize: { xs: "15px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>
                  $73000
                </Typography>
              </ListItem>
              <Divider />
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
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={imgmedia} alt="img" width="80px" height="80px" />
                  <Typography sx={{ fontSize: { xs: "15px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>
                    Iphone 13 Pro Max
                  </Typography>
                </Box>
                <RemoveCircle />
                <Typography sx={{ fontSize: { xs: "15px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>
                  $73000
                </Typography>
              </ListItem>
              <Divider />
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
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={imgmedia} alt="img" width="80px" height="80px" />
                  <Typography sx={{ fontSize: { xs: "15px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>
                    Iphone 13 Pro Max
                  </Typography>
                </Box>
                <RemoveCircle />
                <Typography sx={{ fontSize: { xs: "15px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>
                  $73000
                </Typography>
              </ListItem>
            </List>
            <Divider />
            <Box textAlign="right" mt={1} mb={1} sx={{display:"flex",justifyContent:"flex-end",alignItems:"center",flexDirection:"row",gap:"15px"}}>
                <Typography  sx={{ fontSize: { xs: "16px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>Subtotal : </Typography>
                <Typography sx={{ fontSize: { xs: "16px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>$1,32,000</Typography>
            </Box>
            <Divider />
            <Box textAlign="right" mt={2} mb={2} sx={{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:{xs:"column-reverse",sm:"row",md:"row"},gap:"15px"}}>
                <Button variant="contained" color="secondary" sx={{color:"white"}} startIcon={<ArrowBack />}>
                    Continue Shopping
                </Button>
                <Box sx={{display:"flex",justifyContent:{xs:"flex-end",sm:"center",md:"center",lg:"center"},alignItems:{xs:"flex-end",sm:"center",md:"center",lg:"center"},flexDirection:"row",gap:"25px"}}>
                    <Typography sx={{ fontSize: { xs: "20px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>Total : </Typography>
                    <Typography sx={{ fontSize: { xs: "20px", sm: "20px", md: "20px", xl: "20px" }, fontWeight: 500 }}>$1,32,000</Typography>
                </Box>
            </Box>
          </Box>
          <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:"column",gap:"20px",width:"full" }}>
            <Box sx={{padding:"25px",boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)"}}>
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
            <Box sx={{padding:"25px",boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)"}}>
            <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>
             Payment Option
            </Typography>
            <Divider />
            <img src={payment} alt="img" style={{backgroundColor:"white",marginTop:"15px"}} width="250px" height="100px" />
            <Button variant="contained" color="secondary" sx={{color:"white",width:"100%",marginTop:"15px"}} startIcon={<Shop2Rounded />}>
                    Buy Now
                </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Cart;
