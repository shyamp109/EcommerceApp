import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Avatar,
  TextField,
  Grid,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import { LockOutlined, PhotoCamera } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import images from "../assets/images/slider1.jpg";

function Profile() {
  const [image, setImage] = useState(images);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
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
          Your Profile
        </Typography>
        <Box
          sx={{
            padding: 4,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",

            borderRadius: 3,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Box
            sx={{
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
              }}
            >
              <img
                alt="preview image"
                src={image}
                height={100}
                width={100}
                style={{ borderRadius: "100%" }}
              />
              <div
                style={{
                  backgroundColor: "gray",
                  borderRadius: "100%",
                  position:"absolute",
                  marginTop:"45px",
                  marginLeft:"80px",
                  width:"30px",
                  height:"30px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center"
                }}
              >
                <IconButton
                  color="secondary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={onImageChange}
                  />
                  <PhotoCamera />
                </IconButton>
              </div>
            </Box>
          </Box>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red" }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  color="secondary"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  color="secondary"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="address"
                  id="address"
                  autoComplete="address"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  label="Contact number"
                  id="number"
                  autoComplete="number"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red" }}
                  autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  color="secondary"
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="family-name"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "50%" }}
              >
                cancel
              </Button>
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "50%" }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Profile;
