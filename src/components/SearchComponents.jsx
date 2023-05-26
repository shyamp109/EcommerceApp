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
        width: "13.5%",
      }}
    >
      <ul>
        {suggestions?.map((suggestion) => (
          <li
            onClick={() => {
              setSearch(false);
              navigateDetails(suggestion?._id);
            }}
            style={{ padding: "15px" }}
            key={suggestion.id}
          >
            {suggestion?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponents;
