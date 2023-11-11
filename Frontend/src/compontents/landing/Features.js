import { Container, Typography } from "@mui/material";
import React from "react";

const Features = () => {
  return (
    <>
      <div id="Features">
        <Typography variant="h2" align="center" sx={{ fontWeight: "900" }}>
          Features
        </Typography>
        <Typography
          className="main-title"
          align="center"
          color="GrayText"
          marginBottom={4}
        >
          Why join HobbyHub?
        </Typography>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f6d3d5",
            paddingY: "50px",
            borderRadius: "20px",
            gap: "60px",
            //   height: "300px",
          }}
        >
          <div>
            <Typography
              variant="h4"
              sx={{ paddingleft: "50px", fontWeight: "600" }}
            >
              Share your passion and showcase your skills
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: "50px" }}>
              Whether you are into gardening, knitting, photography, or anything
              else, you can find your tribe here.
            </Typography>
          </div>
          <img
            className="feature-img"
            src="../../hobbyhub/images/homefinal.png"
            alt="home"
            style={{
              width: "700px",
              marginRight: "20px",
              marginTop: "50px",
              transform: "rotate(-10deg)",
              borderRadius: "20px",
              "box-shadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          />
        </Container>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f6d3d5",
            paddingY: "50px",
            borderRadius: "20px",
            gap: "60px",
            marginTop: "30px",
          }}
        >
          <img
            src="../../hobbyhub/images/hobbies.png"
            alt="home"
            style={{
              width: "500px",
              marginRight: "20px",
              borderRadius: "20px",
              "box-shadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              transform: "rotate(5deg)",
            }}
          />
          <div>
            <Typography
              variant="h5"
              sx={{ paddingleft: "50px", fontWeight: "600" }}
            >
              Discover new hobbies and learn from your hobby mates
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: "50px" }}>
              Enables users to express their passion and creativity through
              their hobbies. They can share their projects, works, or
              achievements with other users who appreciate their hobbies.
            </Typography>
          </div>
        </Container>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f6d3d5",
            paddingY: "50px",
            borderRadius: "20px",
            gap: "60px",
            marginTop: "30px",
          }}
        >
          <div>
            <Typography
              variant="h5"
              sx={{ paddingleft: "50px", fontWeight: "600" }}
            >
              Meet like-minded people and make new friends
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: "50px" }}>
              Facilitates users to connect with other people who share their
              hobbies. They can join groups, forums, or chats where they can
              discuss their hobbies, ask questions, or exchange ideas. They can
              also make new friends who have similar interests and hobbies as
              them.
            </Typography>
          </div>
          <img
            src="../../hobbyhub/images/groups.png"
            alt="home"
            style={{
              width: "600px",
              marginRight: "20px",
              marginTop: "10px",
              transform: "rotate(-5deg)",
              borderRadius: "20px",
              "box-shadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          />
        </Container>
      </div>
    </>
  );
};

export default Features;
