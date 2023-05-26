import React, { useRef, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import images from "../assets/images/slider1.jpg";
import { ValidatePath } from "../utills/helper";
import {
  EditOffOutlined,
  FileDownloadDoneRounded,
  PhotoCamera,
} from "@mui/icons-material";

function Profile() {
  const [image, setImage] = useState(images);
  const location = useLocation();
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(image);
  const handleFileUpload = () => {
    const file = fileInputRef.current.files[0];
    console.log(file);
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
  };

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(URL.createObjectURL(event.target.files[0]));
  //   }
  // };

  return (
    <>
      <Container
        sx={{
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          sx={{
            padding: { xs: 2, sm: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            borderRadius: 3,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Typography
            color="otherColor"
            textAlign="left"
            mt={1}
            sx={{
              fontSize: { xs: "25px", sm: "30px", md: "35px", xl: "50px" },
            }}
            component="h3"
          >
            Edit Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                justifyContent: "flex-end",
                alignItems: {
                  xs: "flex-start",
                  sm: "flex-start",
                  md: "flex-end",
                },
                gap: "20px",
              }}
            >
              {selectedImage && (
                <img
                  alt="previewimage"
                  src={selectedImage}
                  height={150}
                  width={150}
                  style={{ borderRadius: "20px" }}
                />
              )}

              <div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  <Button
                    onClick={() => fileInputRef.current.click()}
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white" }}
                  >
                    Choose a file
                  </Button>
                  <Button
                    onClick={handleFileUpload}
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white" }}
                  >
                    upload
                  </Button>
                </div>
                <Typography mt={2}>
                  Acceptable formats jpg ,png only <br />
                  Max file size is 500 kb and minimum file size is 70kb
                </Typography>
              </div>
            </Box>
          </Box>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography
              color="secondary"
              textAlign="left"
              mt={1}
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "25px", xl: "40px" },
              }}
              component="h3"
            >
              Account Information
            </Typography>
            <Grid container mt={1} spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  flexDirection: "row",

                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  First Name
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  Last Name
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="lastname"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  Email
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  Address Line 1
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address Line 1"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  City / Town
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  State
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="state"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  Country
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="country"
                  required
                  fullWidth
                  id="country"
                  label="country"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Typography
                  color="secondary"
                  textAlign="left"
                  mt={1}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "13px",
                      md: "15px",
                      xl: "20px",
                    },
                    // width: "130px",
                  }}
                  component="h3"
                >
                  Postal Code
                </Typography>
                <TextField
                  color="secondary"
                  sx={{ borderColor: "red", flex: 0.5 }}
                  autoComplete="given-name"
                  name="pincode"
                  required
                  fullWidth
                  id="pincode"
                  label="pincode"
                  autoFocus
                />
              </Grid>
            </Grid>

            {/* <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
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
            </Box> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Profile;
