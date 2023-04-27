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

import { Shop, ViewAgendaOutlined } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import CategoryList from "../components/Category";
import { ValidatePath } from "../utills/helper";

function ProductList() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [pathName,setPathName] = useState(false);
  // const path = location.pathname;
  // const pathName = ValidatePath(path);
  // console.log("abc", pathName);
  useEffect(() => {
    // Fetch data from the API and update the state
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

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
                <CardMedia
                  component="img"
                  to="/productDetails"
                  p={5}
                  sx={{ width: "100%", height: "270px", objectFit: "contain" }}
                  image={product.image}
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
                      flexDirection: "row",
                      gap: "20px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      startIcon={<Shop />}
                      color="secondary"
                      sx={{ color: "white" }}
                      variant="contained"
                    >
                      Buy Now
                    </Button>
                    <Button
                      component={NavLink}
                      to="/productDetails"
                      startIcon={<ViewAgendaOutlined />}
                      color="secondary"
                      variant="contained"
                      sx={{ color: "white" }}
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
// {
//   /* <Box sx={{ display: "flex", flexDirection: "row" }}>
// <SliderImage />
// <List
//   sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
// >
//   <ListItem alignItems="flex-start">
//     <ListItemAvatar>
//       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//     </ListItemAvatar>
//     <ListItemText
//       primary="Brunch this weekend?"
//       secondary={
//         <React.Fragment>
//           <Typography
//             sx={{ display: "inline" }}
//             component="span"
//             variant="body2"
//             color="text.primary"
//           >
//             Ali Connors
//           </Typography>
//           {" — I'll be in your neighborhood doing errands this…"}
//         </React.Fragment>
//       }
//     />
//   </ListItem>
//   <Divider variant="inset" component="li" />
//   <ListItem alignItems="flex-start">
//     <ListItemAvatar>
//       <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//     </ListItemAvatar>
//     <ListItemText
//       primary="Summer BBQ"
//       secondary={
//         <React.Fragment>
//           <Typography
//             sx={{ display: "inline" }}
//             component="span"
//             variant="body2"
//             color="text.primary"
//           >
//             to Scott, Alex, Jennifer
//           </Typography>
//           {" — Wish I could come, but I'm out of town this…"}
//         </React.Fragment>
//       }
//     />
//   </ListItem>
//   <Divider variant="inset" component="li" />
//   <ListItem alignItems="flex-start">
//     <ListItemAvatar>
//       <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//     </ListItemAvatar>
//     <ListItemText
//       primary="Oui Oui"
//       secondary={
//         <React.Fragment>
//           <Typography
//             sx={{ display: "inline" }}
//             component="span"
//             variant="body2"
//             color="text.primary"
//           >
//             Sandra Adams
//           </Typography>
//           {" — Do you have Paris recommendations? Have you ever…"}
//         </React.Fragment>
//       }
//     />
//   </ListItem>
//   <Divider variant="inset" component="li" />
//   <ListItem alignItems="flex-start">
//     <ListItemAvatar>
//       <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//     </ListItemAvatar>
//     <ListItemText
//       primary="Oui Oui"
//       secondary={
//         <React.Fragment>
//           <Typography
//             sx={{ display: "inline" }}
//             component="span"
//             variant="body2"
//             color="text.primary"
//           >
//             Sandra Adams
//           </Typography>
//           {" — Do you have Paris recommendations? Have you ever…"}
//         </React.Fragment>
//       }
//     />
//   </ListItem>
//   <Divider variant="inset" component="li" />
//   <ListItem alignItems="flex-start">
//     <ListItemAvatar>
//       <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//     </ListItemAvatar>
//     <ListItemText
//       primary="Oui Oui"
//       secondary={
//         <React.Fragment>
//           <Typography
//             sx={{ display: "inline" }}
//             component="span"
//             variant="body2"
//             color="text.primary"
//           >
//             Sandra Adams
//           </Typography>
//           {" — Do you have Paris recommendations? Have you ever…"}
//         </React.Fragment>
//       }
//     />
//   </ListItem>
// </List>
// </Box> */
// }
<Container sx={{ marginTop: "30px" }}>
  <Typography
    color="otherColor"
    textAlign="left"
    sx={{
      fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
    }}
    component="h3"
  >
    Contact Us
  </Typography>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={8} md={4}></Grid>
    <Grid item xs={12} sm={8} md={4}></Grid>
    <Grid item xs={12} md={4}></Grid>
    <Grid item xs={12} md={4}></Grid>
  </Grid>
</Container>;
