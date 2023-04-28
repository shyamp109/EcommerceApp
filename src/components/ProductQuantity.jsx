import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(0.5),
  },
  quantity: {
    margin: theme.spacing(0, 2),
  },
}));

const ProductQuantity = () => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box mt={1} sx={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
      <RemoveSharpIcon color="primary" sx={{backgroundColor:"#d1adcc",borderRadius:"5px",cursor:"pointer"}}  onClick={handleDecreaseQuantity} />
      <Typography variant="h6" px={2}>
        {quantity}
      </Typography>
      
        <AddSharpIcon color="primary" sx={{backgroundColor:"#d1adcc",borderRadius:"5px",cursor:"pointer"}} onClick={handleIncreaseQuantity} />
    </Box>
  );
};

export default ProductQuantity;
