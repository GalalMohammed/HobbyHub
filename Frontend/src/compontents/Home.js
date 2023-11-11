import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Hobbies from "../Hobbies";
import Chats from "./Chats";

const Home = () => {
  const [isHobbies, setIsHobbies] = useState(true);

  // const hobbies = document.querySelector(".hobbies");
  // const chats = document.querySelector(".chats");

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
      // hobbies.style.display = "flex";
      // chats.style.display = "none";
    }

    function rightClick() {
      btn.style.left = "150px";
      setIsHobbies(false);
      // hobbies.style.display = "none";
      // chats.style.display = "block";
    }
  });

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div>
        <div style={{ height: "80px" }}></div>
        <Categories />
        <div class="form-box">
          <div class="button-box">
            <div id="btn"></div>
            <button type="button" class="toggle-btn left active" id="left">
              Hobbies
            </button>
            <button type="button" class="toggle-btn right" id="right">
              Chats
            </button>
          </div>
        </div>
        {isHobbies ? <Hobbies /> : <Chats />}
      </div>
    </div>
  );
};

export default Home;
