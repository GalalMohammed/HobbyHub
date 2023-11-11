import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const nav = useNavigate();
  return (
    <div id="Home">
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <div className="txt-section" style={{ paddingRight: "50px" }}>
          <Typography variant="h3" sx={{ marginBottom: "10px" }}>
            Discover New Hobbies and Meet Like-Minded People
          </Typography>
          <Typography sx={{ marginBottom: "30px" }} color="text.secondary">
            Join our social media platform and connect with people who share
            your passion for hobbies. Explore new activities, share experiences,
            and make friends.
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: "20px" }}
            onClick={() => nav("/HobbyHub/signup")}
          >
            Join HobbyHub
          </Button>
        </div>
        <div className="img-section">
          <img
            src="../../HobbyHub/images/Tennis-bro.png"
            alt="landing-img"
            style={{ width: "500px", marginLeft: "20px" }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Intro;
