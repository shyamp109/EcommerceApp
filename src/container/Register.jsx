import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";
import {theme} from "../utills/theme";
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
});
export default function Register() {
  const navigate = useNavigate();
  const [fNameError, setFnameError] = React.useState(false);
  const [lNameError, setLnameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (event) => {
    if (!event.target.value.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else if (!event.target.value) {
      setEmailError("Email is required.");
    } else {
      setEmailError(false);
    }
  };
  const handleFnameChange = (event) => {
    if (!event.target.value) {
      setFnameError("First Name is required.");
    } else {
      setFnameError(false);
    }
  };
  const handleLnameChange = (event) => {
    if (!event.target.value) {
      setLnameError("Last Name is required.");
    } else {
      setLnameError(false);
    }
  };
  const handlePasswordChange = (event) => {
    if (event.target.value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!event.target.value) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    if (!firstName) {
      setFnameError("First Name is required.");
    } else {
      setFnameError(false);
    }
    if (!lastName) {
      setLnameError("Last Name is required.");
    } else {
      setLnameError(false);
    }
    if (!email) {
      setEmailError("Email is required.");
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(false);
    }
    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError(false);
    }
    if (email && password && firstName && lastName) {
      navigate("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          padding: 4,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 3,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="secondary" component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CssTextField
                color="secondary"
                sx={{ borderColor: "red" }}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={Boolean(fNameError)}
                onChange={handleFnameChange}
                helperText={fNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                required
                fullWidth
                color="secondary"
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={Boolean(lNameError)}
                onChange={handleLnameChange}
                helperText={lNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                fullWidth
                color="secondary"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(emailError)}
                onChange={handleEmailChange}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                fullWidth
                color="secondary"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(passwordError)}
                onChange={handlePasswordChange}
                helperText={passwordError}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography
                component={NavLink}
                to="/login"
                color="secondary"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
