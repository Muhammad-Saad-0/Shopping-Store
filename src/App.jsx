import React from 'react'
import Home from './Pages/Home'
import { Route, Routes, useParams } from "react-router";
import AllProducts from "./Pages/AllProducts";
import NavBar from "./Components/NavBar/NavBar";
import SingleCategory from './Pages/SingleCategory';

const App = () => {
 
  return (
  <>
      <NavBar />

   <Routes>
      <Route path="/products" element={<AllProducts />} />
      <Route path="/" element={<Home />} />
      <Route path="/products/category/:categoryId" element={<SingleCategory />} />
    </Routes>
  </>
  )
}

export default App