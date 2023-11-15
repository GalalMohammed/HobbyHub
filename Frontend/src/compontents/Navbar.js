import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/")
      .then((res) => setUsername(res.data.username));
  }, []);
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: "calc(100% - 240px)",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Toolbar>
        <div
          style={{
            marginRight: "auto",
            "border-radius": "20px",
            width: "500px",
            height: "35px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "box-shadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "0 20px",
          }}
        >
          <span>Search ...</span>
          <SearchIcon />
        </div>
        <Typography>Hello, {username}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
