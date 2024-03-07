import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import { getRequest } from "../utils/services";

const Categories = ({ handleCategory }) => {
  let [categories, setCategories] = useState([]);
  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      const res = await getRequest(`http://127.0.0.1:8000/api/categories/`);
      if (res.error) console.log(res.error);
      setCategories(res);
    };
    getCategories();
  }, []);

  // Handle categories slider
  const initSlider = () => {
    const imageList = document.querySelector(".categories");
    const sliderButtons = document.querySelectorAll(".arrows");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    sliderButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        let direction = e.target.classList.contains("right-arrow") ? 1 : -1;
        let scrollAmount = (imageList.clientWidth / 2) * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });

    // Control each button visibility
    const handleSliderButtons = () => {
      sliderButtons[0].style.display =
        imageList.scrollLeft <= 0 ? "none" : "block";
      sliderButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    imageList.addEventListener("scroll", () => {
      handleSliderButtons();
    });
  };

  useEffect(() => {
    initSlider();
  });
  return (
    <Container className="categories-section">
      <div>Categories</div>
      <div className="categories">
        <span className="arrows left-arrow">&lt;</span>
        {categories.map((category) => (
          <div
            className="cat"
            key={category.name}
            onClick={() => handleCategory(category.name)}
          >
            <img src={category.icon_url} alt={category.name} />
            <span>{category.name}</span>
          </div>
        ))}
        <span className="arrows right-arrow">&gt;</span>
      </div>
    </Container>
  );
};
export default Categories;
