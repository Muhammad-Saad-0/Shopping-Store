import React, {useState} from 'react';
import SideImage from '../assets/icons/dl.beatsnoop 1.png'
import '../styles/Register/login.css'
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { auth } from "../Data/firebase";
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
   
}

  return (
    <>
    <section className='login-section'>
    <img src={SideImage} alt="" />
<section className='login-right-section'>
    <p>Log in to Exclusive</p>
    <p>Enter your details below</p>
    <div className="login-inputs">
        <input type="email" placeholder='Email'  onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password'    onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <button  onClick={onLogin} >Log in</button>
</section>
    </section>
    </>
  )
}

export default LogIn