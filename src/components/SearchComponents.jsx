import React, { useContext } from "react";
import { UserContaxt } from "../layout/MainLayout";
import { Backdrop, Button, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";

const SearchComponents = ({ setSearch }) => {
  const { suggestions } = useContext(UserContaxt);
  const navigate = useNavigate();
  const navigateDetails = (id) => {
    navigate("/productDetails", {
      state: {
        productId: id,
      },
    });
  };
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 15,
        background: "white",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        color: "black",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        listStyle: "none",
        width: "220px",
        maxHeight: "450px",
      }}
    >
      <ul style={{ padding: 0, overflowY: "scroll" }}>
        {suggestions?.map((suggestion) => (
          <li
            onClick={() => {
              setSearch(false);
              navigateDetails(suggestion?._id);
            }}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              gap: "15px",
              padding: "10px",
              borderWidth: 1,
              borderColor: "black",
            }}
            key={suggestion.id}
          >
            <img
              src={`https://ecommerce-server-le5a.onrender.com/${suggestion?.image}`}
              alt={suggestion?.name}
              style={{ width: "50px", height: "50px" }}
            />
            <Typography
              sx={{
                fontWeight: 500,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {suggestion?.name}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponents;
