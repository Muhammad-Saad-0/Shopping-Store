import React from 'react'
import SideImage from '../assets/icons/dl.beatsnoop 1.png'
import { Link } from 'react-router-dom'
import '../styles/Register/SignIn.css'
import Footer from '../Components/Footer/Footer'
const SignIn = () => {
  return (
    <>
    <section className='signin-section'>
    <img src={SideImage} alt="" />
<section className='signin-right-section'>
    <p>Create an account</p>
    <p>Enter your details below</p>
    <div className="signin-inputs">
        <input type="text" placeholder='Name' />
        <input type="email" placeholder='Email' />
        <input type="password" placeholder='Password' />
    </div>
    <button>Create Account</button>
    <div className="bottom-signin">
        <p>Already have account?</p>
        <Link to='/login'>Log in</Link>
    </div>
</section>
    </section>
    <Footer />
    </>
  )
}

export default SignIn