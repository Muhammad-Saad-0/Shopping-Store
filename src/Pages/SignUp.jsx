import React, { useState, useEffect } from "react";
import SideImage from "../assets/icons/dl.beatsnoop 1.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Register/SignUp.css";
import Footer from "../Components/Footer/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Data/firebase";

const SignUp = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <>
      <section className="signin-section">
        <img src={SideImage} alt="" />
        <section className="signin-right-section">
          <p>Create an account</p>
          <p>Enter your details below</p>
          <div className="signin-inputs">
            <input type="text" placeholder="Name" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" onClick={onSubmit}>
            Create Account
          </button>
          <div className="bottom-signin">
            <p>Already have account?</p>
            <Link to="/login">Log in</Link>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default SignUp;
