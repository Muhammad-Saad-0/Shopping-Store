import React from 'react'
import Home from './Pages/Home'
import { Route, Routes, useParams } from "react-router";
import AllProducts from "./Pages/AllProducts";
import NavBar from "./Components/NavBar/NavBar";
import SingleCategory from './Pages/SingleCategory';
import SingleProduct from './Pages/SingleProduct';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import WishList from './Pages/WishList';
import Cart from './Pages/Cart';
import { ToastContainer} from 'react-toastify';
import "./styles/Navbar/Navbar.css";
const App = () => {

  return (
  <>
   <ToastContainer
position="bottom-right"
autoClose={1500}
limit={7}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <NavBar />

   <Routes>
      <Route path="/products" element={<AllProducts />} />
      <Route path="/" element={<Home />} />
      <Route path="/products/category/:categoryId" element={<SingleCategory />} />
      <Route path="/products/product/:productId" element={<SingleProduct />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/wishlist' element={<WishList />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  </>
  )
}

export default App