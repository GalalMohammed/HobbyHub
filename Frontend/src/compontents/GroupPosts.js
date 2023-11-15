import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Container, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { IconButton, Typography } from "@mui/material";
import Masonry from "react-masonry-css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreatePost from "./CreatePost";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginRight: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GroupPosts = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [group, setGroup] = useState({});

  // Fetch group based on group ID
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/groups/${params.groupId}/`)
      .then((res) => setGroup(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [posts, setPosts] = useState([]);
  const params = useParams();

  // Fetch posts of the group based on its Id
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/groups/${params.groupId}/posts/`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [username, setUsername] = useState("");

  // Get the current user name
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/")
      .then((res) => setUsername(res.data.username));
  }, []);

  const [notMember, setNotMember] = React.useState(false);
  const nav = useNavigate();

  // Creates a new post and send it to the api
  const handlePost = async (formData) => {
    await axios
      .post(`http://localhost:8000/api/groups/${group.id}/post/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        posts.push(res.data);
        console.log(res.data);
        nav(`/HobbyHub/main/groups/group/${group.id}/posts`);
      })
      .catch((error) => {
        if (error.response.status !== 200) {
          setNotMember(true);
        }
      });
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      console.log(e.target);
    }
  };

  const breakpoints = {
    default: 4,
    1166: 3,
    1152: 2,
    768: 1,
  };

  return (
    <div>
      <Container sx={{ width: "100%" }}>
        <Typography color="primary" variant="h4" sx={{ fontWeight: "bold" }}>
          {group.name}
        </Typography>
        {notMember && (
          <Alert severity="error">You are not a member of this group</Alert>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Posts</h2>
          <div className="addIcon" onClick={handleClickOpen}>
            <PostAddIcon color="primary" sx={{ marginTop: "6px" }} />
          </div>
        </div>
        <CreatePost
          handlePost={handlePost}
          groupId={group.id}
          open={open}
          handleClose={handleClose}
        />
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <Card>
              <CardHeader
                avatar={<Avatar>{post.user.user[0].toUpperCase()}</Avatar>}
                title={post.user.user}
                subheader={post.hobby}
              ></CardHeader>
              {post.image_url && (
                <CardMedia
                  component="img"
                  height="194"
                  image={post.image_url}
                  alt="postImg"
                />
              )}
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {post.caption}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ChatBubbleOutlineIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Comments</Typography>
                  {post.comments &&
                    post.comments.map((comment) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          backgroundColor: "#f2f2f2",
                          padding: "10px",
                          borderRadius: "5px",
                          marginTop: "-7px",
                        }}
                      >
                        <Avatar>{comment.user.user[0].toUpperCase()}</Avatar>
                        <div>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {comment.user.user}
                          </Typography>
                          <Typography>{comment.text}</Typography>
                        </div>
                      </div>
                    ))}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      backgroundColor: "#f2f2f2",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: "-7px",
                    }}
                  >
                    <Avatar>{username[0].toUpperCase()}</Avatar>
                    <div>
                      <TextField
                        id="comment"
                        name="comment"
                        label="Add a comment"
                        type="text"
                        fullWidth
                        size="small"
                        onKeyUp={handleComment}
                      />
                    </div>
                  </div>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Masonry>
      </Container>
    </div>
  );
};

export default GroupPosts;
