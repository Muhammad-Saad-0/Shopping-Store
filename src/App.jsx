import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from "react-router";
import AllProducts from "./Pages/AllProducts";
import NavBar from "./Components/NavBar/NavBar";

const App = () => {
  return (
  <>
      <NavBar />

   <Routes>
      <Route path="/products" element={<AllProducts />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </>
  )
}

export default App