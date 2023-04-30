import React from 'react'
import SideImage from '../assets/icons/dl.beatsnoop 1.png'
import { Link } from 'react-router-dom'
import '../styles/Register/login.css'
const LogIn = () => {
  return (
    <>
    <section className='login-section'>
    <img src={SideImage} alt="" />
<section className='login-right-section'>
    <p>Log in to Exclusive</p>
    <p>Enter your details below</p>
    <div className="login-inputs">
        <input type="email" placeholder='Email' />
        <input type="password" placeholder='Password' />
    </div>
    <button>Log in</button>
</section>
    </section>
    </>
  )
}

export default LogIn