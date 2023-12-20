import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";


const Header = ({ children, hasHiddenAuthButtons }) => {
  // console.log(children)
  // console.log(hasHiddenAuthButtons)
  const history = useHistory();
  const clearItem = () => {
    localStorage.clear();
    history.push("/", { from: "products" })
    window.location.reload()
  }
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      {hasHiddenAuthButtons ?
        (
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => history.push("/", { from: "HomePage" })}
          >
            Back to explore
          </Button>
        ) :
        (
          !localStorage.getItem("username") ?
            (
              <Stack direction="row" spacing={1}>
                <Button onClick={() => history.push("/login", { from: "products" })}>LOGIN</Button>
                <Button onClick={() => history.push("/register", { from: "products" })}>REGISTER</Button>
              </Stack>
            )
            :
            <Stack direction="row" spacing={2}>
            <Avatar alt={localStorage.getItem("username")} src="avatar.png" />
            <p>{localStorage.getItem("username")}</p>
            <Button onClick={clearItem}>LOGOUT</Button>
            </Stack>
        )}
    </Box>
  );
};

export default Header;
