import React, { useState } from "react";
import spinner from "../assets/images/Spin-1s-257px.gif";
import { Backdrop } from "@mui/material";
const Loader = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      // onClick={handleClose}
    >
      <img src={spinner} alt="spinner" height="100px" width="100px" />
    </Backdrop>
  );
};

export default Loader;
