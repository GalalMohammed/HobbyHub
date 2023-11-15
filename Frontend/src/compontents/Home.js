import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import Hobbies from "./ListHobbies";
import Groups from "./Groups";
import { Box } from "@mui/material";

const Home = () => {
  const [isHobbies, setIsHobbies] = useState(true);
  const [category, setCategory] = useState("Art");

  useEffect(() => {
    const btn = document.getElementById("btn");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const toggleBtns = document.querySelectorAll(".toggle-btn");

    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", removeAllActive);
    });

    function removeAllActive() {
      toggleBtns.forEach((btn) => {
        btn.classList.remove("active");
        this.classList.add("active");
      });
    }

    left.addEventListener("click", leftClick);
    right.addEventListener("click", rightClick);

    function leftClick() {
      btn.style.left = "0";
      setIsHobbies(true);
    }

    function rightClick() {
      btn.style.left = "150px";
      setIsHobbies(false);
    }
  }, []);

  function handleCategory(category) {
    console.log(category);
    setCategory(category);
  }

  return (
    <div>
      <Categories handleCategory={handleCategory} />
      <div class="form-box">
        <div class="button-box">
          <div id="btn"></div>
          <button type="button" class="toggle-btn left active" id="left">
            Hobbies
          </button>
          <button type="button" class="toggle-btn right" id="right">
            Groups
          </button>
        </div>
      </div>
      <Box>
        {isHobbies ? (
          <Hobbies category={category} />
        ) : (
          <Groups category={category} />
        )}
      </Box>
    </div>
  );
};

export default Home;
