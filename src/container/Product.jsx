import React, { useState, useEffect } from "react";
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
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import CategoryList from "../components/Category";
import { ValidatePath } from "../utills/helper";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [pathName,setPathName] = useState(false);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  // const handleProductClick = (productId) => {
  //   console.log(productId)
  //   navigate(`/productDetails/${productId}`);
  // }
  useEffect(() => {
    setPathName(ValidatePath(location.pathname));
  }, [location]);

  return (
    <>
      <Container sx={{ marginBottom: "50px",marinTop:"25px"}} >
        <CategoryList />
        {pathName && (
          <>
            <Typography
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

        <Grid  container spacing={3} sx={{ paddingTop: 5 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  textDecoration: "none",
                }}
              >
                <CardMedia
                  component="img"
                  // onClick={()=>handleProductClick(product.id)}
                  p={5}
                  sx={{ width: "100%", objectFit: "contain" }}
                  image={product.images}
                  alt={product.title}
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
                      {product.title}
                    </Typography>

                    <Typography color="otherColor" variant="h5" component="h6">
                      ${product.price}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection:{xs:"column",sm:"column",md:"row",lg:"row",xl:"row"},
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      startIcon={<ShoppingBag />}
                      color="secondary"
                      sx={{ color: "white",width:{xs:"100%",sm:"100%",md:"50%",lg:"50%",xl:"50%"} }}
                      variant="contained"
                    >
                      Buy Now
                    </Button>
                    <Button
                      startIcon={<ViewAgendaOutlined />}
                      component={NavLink}
                      to={`/productDetails/${product.id}`}
                      color="secondary"
                      variant="contained"
                      sx={{ color: "white",width:{xs:"100%",sm:"100%",md:"50%",lg:"50%",xl:"50%"} }}
                    >
                      View More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default ProductList;

