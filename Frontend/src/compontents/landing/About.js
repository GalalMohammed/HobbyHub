import React from "react";
import { Container, Typography } from "@mui/material";

const About = () => {
  return (
    <div id="About">
      <Container sx={{ marginY: "40px" }}>
        <Typography variant="h2" align="center" sx={{ fontWeight: "900" }}>
          About Us
        </Typography>
        <Typography
          className="main-title"
          align="center"
          color="GrayText"
          marginBottom={4}
        >
          The great team
        </Typography>
        <div className="about-content">
          <div className="image">
            <img
              src="../../HobbyHub/images/kajetan-sumila-gsOy0c8HdHc-unsplash.jpg"
              alt=""
            />
          </div>
          <div className="text">
            <p>
              We are a team of hobby enthusiasts who wanted to create a space
              where people can connect over their hobbies. We believe that
              hobbies are not only a way to relax and have fun, but also a way
              to express yourself and grow as a person. We hope that MyHobby
              will inspire you to pursue your hobbies and find your community.
            </p>
            <hr />
            <p>
              If you have any questions, feedback, or suggestions, please feel
              free to contact us. We would love to hear from you.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
