import React from "react";

import Slider from "../Components/Slider/Slider";
import Categories from "../Components/Categories/Categories";
import Sale from "../Components/Sale/Sale";
import AllProducts from "../Components/Explore Products/ExploreProducts";
import Services from "../Components/Services/Services";
import Footer from "../Components/Footer/Footer";
import { auth } from "../Data/firebase";

const Hero = () => {

  return (
    <>
      <Slider />
      <Categories />
      <Sale />
      <AllProducts />
      <Services />
      <Footer />
    </>
  );
};

export default Hero;
