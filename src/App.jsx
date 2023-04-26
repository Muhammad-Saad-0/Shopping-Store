import React from 'react'
import Home from './Pages/Home'
import { Route, Routes, useParams } from "react-router";
import AllProducts from "./Pages/AllProducts";
import NavBar from "./Components/NavBar/NavBar";
import SingleCategory from './Pages/SingleCategory';
import SingleProduct from './Pages/SingleProduct';
import AboutUs from './Pages/AboutUs';

const App = () => {
 
  return (
  <>
      <NavBar />

   <Routes>
      <Route path="/products" element={<AllProducts />} />
      <Route path="/" element={<Home />} />
      <Route path="/products/category/:categoryId" element={<SingleCategory />} />
      <Route path="/products/product/:productId" element={<SingleProduct />} />
      <Route path='/about' element={<AboutUs />} />
    </Routes>
  </>
  )
}

export default App