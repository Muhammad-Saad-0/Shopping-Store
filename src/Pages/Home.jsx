import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import "../styles/Navbar/Navbar.css";
import Slider from "../Components/Slider/Slider";
import Categories from "../Components/Categories/Categories";
const Hero = () => {
  return (
    <>
      <NavBar />
      <Slider />
      <Categories />
    </>
  );
};

export default Hero;
