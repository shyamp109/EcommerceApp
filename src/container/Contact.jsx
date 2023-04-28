import {
  EmailRounded,
  FaxRounded,
  LocationCity,
  SmartphoneRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ValidatePath } from "../utills/helper";
import styled from "@emotion/styled";
import {theme} from "../utills/theme";
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
});
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
  });
  const location = useLocation();
  const [pathName,setPathName] = useState(false);
  useEffect(() => {
    setPathName(ValidatePath(location.pathname));
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send form data to server or email using API or backend
    console.log(formData);
  };
  return (
    <Container sx={{ marginTop: "30px" }}>
      {pathName && 
          <>
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
          </>
        }
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            marginBottom: "50px",
          },
          
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
              lg: "row",
              xl: "row",
            },
            justifyContent:"center",
            marginTop: "20px",
            marginLeft: "0",
            gap: "20px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            p={0}
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "10px",
              borderRadius:"10px",
            }}
          >
            <LocationCity fontSize="large" color="secondary" />
            <Typography textAlign="center" sx={{fontSize: { xs: "20px", sm: "25px", md: "25px",lg:"25px " ,xl: "25px" }}} variant="h5">
              Our Main Office
            </Typography>
            <Typography textAlign="center" sx={{ fontSize: "14px" }}>
              SoHo 94 St New York, NY 1001
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            p={0}
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "10px",
              borderRadius:"10px",
            }}
          >
            <SmartphoneRounded fontSize="large" color="secondary" />
            <Typography textAlign="center" sx={{fontSize: { xs: "20px", sm: "25px", md: "25px",lg:"25px " ,xl: "25px" }}} variant="h5">
              Phone Number
            </Typography>
            <Typography textAlign="center" sx={{ fontSize: "14px" }}>
              234-9876-5400 +91-848707567
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            p={0}
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "10px",
              borderRadius:"10px",
            }}
          >
            <FaxRounded fontSize="large" color="secondary" />
            <Typography textAlign="center" sx={{fontSize: { xs: "20px", sm: "25px", md: "25px",lg:"25px " ,xl: "25px" }}} variant="h5">
              Fax
            </Typography>
            <Typography textAlign="center" sx={{ fontSize: "14px" }}>
              +91-8487075767
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            p={0}
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "10px",
              borderRadius:"10px",
            }}
          >
            <EmailRounded fontSize="large" color="secondary" />
            <Typography textAlign="center" sx={{fontSize: { xs: "20px", sm: "25px", md: "25px",lg:"25px " ,xl: "25px" }}} variant="h5">
              Email
            </Typography>
            <Typography textAlign="center" sx={{ fontSize: "14px" }}>
              shyamp.itpath@gmail.com
            </Typography>
          </Grid>
        </Grid>

        <Box>
          <form onSubmit={handleSubmit}>
            <CssTextField
              label="Name"
              name="name"
              color="secondary"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
            <CssTextField
              label="Email"
              name="email"
              color="secondary"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />

            <CssTextField
              label="Message"
              name="message"
              color="secondary"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={6}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              sx={{color:"white"}}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
