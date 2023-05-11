import React, { useContext} from "react";
import {
  Typography,
  Container,

} from "@mui/material";

import { UserContaxt } from "../layout/MainLayout";

import Loader from "../components/Loader";
import { ValidatePath } from "../utills/helper";
import { useLocation } from "react-router-dom";

function Order() {
  const { data } = useContext(UserContaxt);
  const location = useLocation();
  const path = location.pathname;
  const pathName = ValidatePath({ path });
  return (
    <>
      <Container sx={{ marginBottom: "50px" }}>
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

        
      </Container>
      
    </>
  );
}
export default Order;
