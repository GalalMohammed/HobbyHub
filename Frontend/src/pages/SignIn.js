import * as React from "react";
import { Button } from "@mui/material/";
import { CssBaseline } from "@mui/material/";
import { TextField } from "@mui/material/";
import { Link } from "@mui/material/";
import { Grid } from "@mui/material/";
import { Box } from "@mui/material/";
import { Typography } from "@mui/material/";
import { Container } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
//import {group.png} from '../../public/images/group.png'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" path="/HobbyHub">
        HobbyHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const nav = useNavigate();
  const [checkFormValues, setCheckFormValues] = React.useState({
    username: false,
    password: false,
  });
  //const [errorMessage, setErrorMessage] = React.useState("");
  const { login, error, isLoading } = useLogin();

  // Handle form values and send login request
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setCheckFormValues({
      username: false,
      password: false,
    });

    // Check if text fields are empty
    if (formData.get("username") === "") {
      setCheckFormValues({ ...checkFormValues, username: true });
    }
    if (formData.get("password") === "") {
      setCheckFormValues({ ...checkFormValues, password: true });
    }

    await login(formData.get("username"), formData.get("password"));
  };

  return (
    <div className="wrapper" style={{ display: "flex" }}>
      <div
        className="img-field"
        style={{
          width: "50%",
          height: "100vh",
          backgroundColor: "#d0242e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="../HobbyHub/images/Makingart-pana.png"
          alt="loginPage"
          style={{ width: "300px" }}
        />
        <Typography
          color={"white"}
          variant="h4"
          sx={{ fontWeight: "bolder" }}
          mt={3}
        >
          Connect with Others
        </Typography>
        <Typography color={"white"} variant="h7" mt={5}>
          Find people who share your interests
        </Typography>
      </div>
      <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bolder" }}
            >
              Sign in
            </Typography>
            {error && <div className="error">{error}</div>}
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
                error={checkFormValues.username}
                helperText={
                  checkFormValues.username ? "username is required" : ""
                }
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
                error={checkFormValues.password}
                helperText={
                  checkFormValues.password ? "password is required" : ""
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Button
                    onClick={() => nav("/HobbyHub/signup")}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}
