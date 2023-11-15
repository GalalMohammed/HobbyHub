import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Box, Button, Container } from "@mui/material";

const Group = () => {
  const [group, setGroup] = useState({});
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/groups/${params.groupId}/`)
      .then((res) => setGroup(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/groups/${params.groupId}/posts/`)
      .then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <Container>
        <img
          src={group.backGround_url}
          alt="groupBackground"
          style={{ width: "1250px", height: "350px", borderRadius: "20px" }}
        />
        <div style={{ marginTop: "-45px", marginLeft: "190px" }}>
          <div className="group-img-info">
            <img
              src={group.icon_url}
              alt="groupIcon"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "5px solid white",
                marginBottom: "10px",
              }}
            />
            <div className="txt" style={{ marginTop: "35px" }}>
              <h1>{group.name}</h1>
              <p style={{ color: "GrayText" }}>{group.category}</p>
            </div>
          </div>
        </div>
        <Container sx={{ width: "70%", marginTop: "-20px" }}>
          <p style={{ color: "GrayText" }}>{group.description}</p>
          <Button
            align="center"
            variant="contained"
            sx={{ borderRadius: "10px" }}
            onClick={() => nav(`/HobbyHub/main/groups/group/${group.id}/posts`)}
          >
            Posts
          </Button>
          <div className="posts">
            {posts.map((post) => (
              <div key={post.id} style={{ marginTop: "30px" }}>
                <Box>
                  <img src={post.image_url} alt="postImage" />
                </Box>
              </div>
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Group;
