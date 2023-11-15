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
      <Link color="inherit" path="/HobbyHub">
        HobbyHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const nav = useNavigate();
  const [formValues, setFormValues] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [checkFormValues, setCheckFormValues] = React.useState({
    username: false,
    email: false,
    password: false,
  });

  // Handle form values and send register request
  const handleSubmit = async (event) => {
    event.preventDefault();
    let status = 200;

    setCheckFormValues({
      username: false,
      email: false,
      password: false,
    });

    // Check if text fields are empty
    if (formValues.username === "") {
      setCheckFormValues({ ...checkFormValues, username: true });
    }
    if (formValues.email === "") {
      setCheckFormValues({ ...checkFormValues, email: true });
    }
    if (formValues.password === "") {
      setCheckFormValues({ ...checkFormValues, password: true });
    }
    console.log(formValues);
    if (
      formValues.username !== "" &&
      formValues.email !== "" &&
      formValues.password !== ""
    ) {
      const { data } = await axios
        .post(
          "http://localhost:8000/api/register/",
          JSON.stringify({ ...formValues }),
          {
            headers: { "Content-Type": "application/json" },
            withCredintials: true,
          }
        )
        .catch(function (error) {
          if (error.response) {
            status = error.response.status;
            console.log("status inside", status);
          }
        });
      // Save the token and add it to request headers
      localStorage.clear();
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Token ${data["token"]}`;
      nav("/HobbyHub/main/home");
    }
  };

  const handleFormValues = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="wrapper" style={{ display: "flex" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bolder" }}
            >
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
                onChange={handleFormValues}
                error={checkFormValues.username}
                helperText={
                  checkFormValues.username ? "username is required" : ""
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleFormValues}
                error={checkFormValues.email}
                helperText={checkFormValues.email ? "email is required" : ""}
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
                onChange={handleFormValues}
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
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Button
                    onClick={() => nav("/HobbyHub/signin")}
                    variant="body2"
                  >
                    {"Already have an account? Sign In"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
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
          src="../HobbyHub/images/Making art-pana.png"
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
    </div>
  );
}
