import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
// import IconButton from '@mui/icons-material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styled from "@emotion/styled";
import {theme} from "../utills/theme";
import { IconButton, InputAdornment } from "@mui/material";
import { api } from "../api";
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
});
export default function Login() {
  const navigate= useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleSubmit =async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
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
    if (email && password) {
      const values = {
        email:email,
        password:password,
      }
      try {
        const { data } =await api.auth.login(values);
        localStorage.setItem("loginToken",data.token)
        // console.log(data.token)
        navigate('/');
       
    } catch (error) {
       console.log(error);
    }
    }
  };
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

  const handlePasswordChange = (event) => {
    if (event.target.value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!event.target.value) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError(false);
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <CssTextField
            margin="normal"
            required
            fullWidth
            color="secondary"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={Boolean(emailError)}
            onChange={handleEmailChange}
            helperText={emailError}
          />
          <CssTextField
            color="secondary"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
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
          <Grid
            item
            xs
            sx={{
              textAlign: "right",
            }}
          >
            <Link
              color="secondary"
              href="#"
              variant="body2"
              sx={{ textDecoration: "none" }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item sx={{ textAlign: "center" }}>
              <Typography
                component={NavLink}
                to="/register"
                color="secondary"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
