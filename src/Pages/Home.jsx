import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import "../styles/Navbar/Navbar.css";
import Slider from "../Components/Slider/Slider";
import Categories from "../Components/Categories/Categories";
import Sale from "../Components/Sale/Sale";
import AllProducts from "../Components/All Products/AllProducts";
const Hero = () => {
  return (
    <>
      <NavBar />
      <Slider />
      <Categories />
      <Sale />
      <AllProducts />
    </>
  );
};

export default Hero;
