import React from "react";
import IconFb from "../../assets/icons/Icon-Facebook.svg";
import IconInsta from "../../assets/icons/icon-instagram.svg";
import IconLin from "../../assets/icons/Icon-Linkedin.svg";
import IconTwitter from "../../assets/icons/Icon-Twitter.svg";
import "../../styles/Footer/Footer.css";
const Footer = () => {
  return (
    <section className="footer-grid">
      <div>
        <b><a href="">Exclusive</a></b>
        <span>
          {" "}
          <a href="#">
            <img src={IconFb} alt="" />
          </a>
          <a href="#">
            <img src={IconInsta} alt="" />
          </a>
          <a href="#">
            <img src={IconLin} alt="" />
          </a>
          <a href="#">
            <img src={IconTwitter} alt="" />
          </a>
        </span>
      </div>
      <div>
        <b>Support</b>
        <p>exclusive@gmail.com</p>
        <p>+123-456-789</p>
      </div>
      <div>
        <b>Account</b>
        <a>My Account</a>
        <a>Login / Register</a>
        <a>Cart</a>
        <a>Wishlist</a>
        <a>Shop</a>
      </div>
      <div>
        <b>Quick Links</b>
        <a>Privacy Policy</a>
        <a>Terms of Use</a>
        <a>FAQ</a>
        <a>Contact</a>
      </div>
    </section>
  );
};

export default Footer;
