import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const CreatePost = ({ open, handleClose, groupId, handlePost }) => {
  const [postData, setPostData] = React.useState({});
  const [image, setImage] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("caption", postData.caption);
    formData.append("hobby", postData.hobby);
    formData.append("image", image);
    handleClose();
    handlePost(formData);
  };

  const handleChange = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [group, setGroup] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`http://localhost:8000/api/groups/${groupId}/`)
      .then((res) => setGroup(res.data))
      .catch((error) => console.log(error));
  }, [groupId]);

  let [hobbies, setHobbies] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories/${group.category}/hobbies/`)
      .then((res) => setHobbies(res.data))
      .catch((error) => console.log(error));
  }, [group]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              autoComplete="caption"
              autoFocus
              margin="dense"
              id="caption"
              name="caption"
              label="Caption"
              type="text"
              fullWidth
              value={postData.caption}
              onChange={handleChange}
            />
            <InputLabel id="demo-simple-select-label">Hobby</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={postData.hobby}
              label="Hobby"
              name="hobby"
              onChange={handleChange}
              fullWidth
            >
              {hobbies.map((hobby) => (
                <MenuItem key={hobby.name} value={hobby.name}>
                  {hobby.name}
                </MenuItem>
              ))}
            </Select>
            <div style={{ marginTop: "20px" }}>
              <label class="custom-file-upload">
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                Image Upload
              </label>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreatePost;
