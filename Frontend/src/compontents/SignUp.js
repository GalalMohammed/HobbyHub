import * as React from "react";
import { Avatar } from "@mui/material/";
import { Button } from "@mui/material/";
import { CssBaseline } from "@mui/material/";
import { TextField } from "@mui/material/";
import { FormControlLabel } from "@mui/material/";
import { Checkbox } from "@mui/material/";
import { Link } from "@mui/material/";
import { Grid } from "@mui/material/";
import { Box } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material/";
import { Container } from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const nav = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const signdata = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/register/",
      signdata,
      { headers: { "Content-Type": "application/json" }, withCredintials: true }
    );
    console.log("data", data.token);
    localStorage.clear();
    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["Authorization"] = `Token ${data["token"]}`;
    nav("/home");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Button onClick={() => nav("/HobbyHub/signin")} variant="body2">
                  {"Already have an account? Sign In"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
