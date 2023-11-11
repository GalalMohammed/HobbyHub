import "./App.css";
import React from "react";
import SignIn from "./compontents/SignIn";
import SignUp from "./compontents/SignUp";
import Home from "./compontents/Home";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./compontents/landing/Main";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d0242e", // Set the primary color to #d0242e
    },
    secondary: {
      main: "#f2f2f2", // Set the background color to #f2f2f2
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
