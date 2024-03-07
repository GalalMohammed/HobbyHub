import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

const Hobbies = ({ category }) => {
  let [hobbies, setHobbies] = useState([]);

  // Fetch hobbies based on chosen category
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories/${category}/hobbies/`, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
      .then((res) => setHobbies(res.data))
      .then((res) => console.log("hobbies", hobbies));
  }, [category]);

  return (
    <div className="hobbies">
      {hobbies.map((hobby) => (
        <div key={hobby.name}>
          <Box
            id="hobby"
            className="img-field"
            sx={{
              ":before": {
                content: `'${hobby.name}'`,
                position: "absolute",
                bottom: "1.5%",
                width: "210px",
                height: "30px",
                "background-color": "rgba(0, 0, 0, 0.3)",
                "border-radius": "30px",
                "z-index": "100",
                color: "white",
                padding: "20px",
              },
            }}
          >
            <img src={hobby.image_url} alt={hobby.name} />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default Hobbies;
