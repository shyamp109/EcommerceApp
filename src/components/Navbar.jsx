import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import "../index.css";
import { ShoppingCart } from "@mui/icons-material";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserContaxt } from "../layout/MainLayout";
import SearchComponents from "./SearchComponents";
import { useDispatch, useSelector } from "react-redux";
import { userToken } from "../redux/reducers/authSlice";
const navItems = ["Home", "Product", "About", "Contact"];
const Header = () => {
  const {
    user,
    handleSearchChange,
    searchItem,
    setSearchItem,
    suggestions,
    search,
    setSearch,
  } = useContext(UserContaxt);

  const { cart } = useSelector((state) => state.cartSlice);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    // Perform logout logic here
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.clear();
    dispatch(
      userToken({
        token: null,
      })
    );
    setOpen(false);
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSerachBarDailog = () => {
    setSearch(true);
  };
  // const logout = () => {
  //   const confirmLogout = window.confirm("Are you sure you want to logout?");
  //   if (confirmLogout) {
  //     setAnchorEl(null);
  //     handleMobileMenuClose();
  //     localStorage.clear();
  //   }
  // };
  useEffect(() => {}, [cart]);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {" "}
      <MenuItem>Hello, {user?.data?.user?.firstName}</MenuItem>
      <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      <Dialog open={open} onClose={handleCancelLogout}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="standard"
            onClick={handleCancelLogout}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="standard"
            onClick={handleConfirmLogout}
            color="secondary"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      color="primary"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="secondary"
        >
          <Badge
            components={NavLink}
            to="/cart"
            badgeContent={cart?.data?.length}
            color="otherColor"
          >
            <ShoppingCart color="secondary" />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="secondary"
        >
          <Badge badgeContent={17} color="otherColor">
            <NotificationsIcon color="secondary" />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="secondary"
        >
          <AccountCircle color="secondary" />
        </IconButton>
        <p>Hello, {user?.data?.user?.firstName}</p>
      </MenuItem>
    </Menu>
  );

  // hndle menu click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  //menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color="secondary"
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, my: 2, textDecoration: "none" }}
      >
        Shopwapp
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ fontSize: "15px" }}
                to={item}
                color="secondary"
                component={NavLink}
                key={item}
              >
                {item}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Box>
        <AppBar color="secondary" component={"nav"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
            }}
          >
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: { sm: "none" } }}>
              <TextField
                variant="outlined"
                placeholder="Search products..."
                value={searchItem}
                onChange={handleSearchChange}
                size="small"
                label="search here..."
                sx={{ color: "white", width: "220px" }}
                onFocus={() => handleSerachBarDailog()}
                // onBlur={()=>setSearch(false)}
              />
              {search ? <SearchComponents setSearch={setSearch} /> : null}
            </Box>

            <Typography
              color="primary"
              variant="h4"
              component={NavLink}
              to="/"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", textDecoration: "none" },
              }}
            >
              ShopWapp
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  to={item}
                  component={NavLink}
                  key={item}
                  color="primary"
                  sx={{ fontSize: "15px" }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                flexDirection: "column",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search products..."
                value={searchItem}
                onChange={handleSearchChange}
                size="small"
                label="search here..."
                sx={{ color: "white", width: "220px" }}
                onFocus={() => handleSerachBarDailog()}
                // onBlur={()=>setSearch(false)}
              />
              {search ? <SearchComponents setSearch={setSearch} /> : null}
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="primary"
                component={NavLink}
                to="/cart"
              >
                <Badge badgeContent={cart?.data?.length} color="otherColor">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="primary"
              >
                <Badge badgeContent={17} color="otherColor">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="secondary"
              >
                <MoreIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            color="primary"
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>

      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

export default Header;
