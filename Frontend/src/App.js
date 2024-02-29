import "./App.css";
import React from "react";
import SignIn from "./compontents/SignIn";
import SignUp from "./compontents/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./compontents/landing/Main";
import MainLayout from "./compontents/MainLayout";
import { useAuthContext } from "./hooks/useAuthContext";
import { ChatContextProvider } from "./context/chatContext";

// Change the default theme
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
  const { user } = useAuthContext();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatContextProvider user={user}>
          <Routes>
            <Route path="/HobbyHub" element={<Main />} />
            <Route
              path="/HobbyHub/signin"
              element={!user ? <SignIn /> : <Navigate to="/HobbyHub/main/" />}
            />
            <Route
              path="/HobbyHub/signup"
              element={!user ? <SignUp /> : <Navigate to="/HobbyHub/main/" />}
            />
            <Route
              path="/HobbyHub/main/*"
              element={
                user ? <MainLayout /> : <Navigate to="/HobbyHub/signin" />
              }
            />
          </Routes>
        </ChatContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
