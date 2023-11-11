import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/material";

const Hobbies = () => {
  let [hobbies, setHobbies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/Art/hobbies/")
      .then((res) => setHobbies(res.data))
      // .then((data) => {
      //   setCategories(data);
      // })
      .then((res) => console.log("hobbies", hobbies));
  }, []);

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
