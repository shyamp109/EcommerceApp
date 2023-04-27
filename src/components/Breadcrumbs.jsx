import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { ShoppingBagSharp } from "@mui/icons-material";
import { Container, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const CheckBreadcrumbs = ({ path }) => {
  if (path === "") {
    return <></>;
  } else if (path === "Home") {
    return <></>;
  } else {
    return (
      <>
        <Container>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" mt={5} mb={5}>
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center",fontSize:"18px" }}
                color="inherit"
                to="/"
                component={NavLink}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />
                Home
              </Link>
              <Typography
                sx={{ display: "flex", alignItems: "center",fontSize:"18px" }}
                color="text.primary"
              >
                <ShoppingBagSharp sx={{ mr: 0.5 }} fontSize="medium" />
                {path}
              </Typography>
            </Breadcrumbs>
          </div>
        </Container>
      </>
    );
  }
};
const Breadcrumb = ({ path }) => {
  const breadcrumb = path.pathname.substring(1).trim();

  return (
    <>
      <CheckBreadcrumbs path={breadcrumb} />
    </>
  );
};
export default Breadcrumb;
