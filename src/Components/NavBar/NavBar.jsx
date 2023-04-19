import React from "react";
import SearchBar from "./SearchBar";
import Cart1 from "../../assets/icons/Cart1.svg";
import heartSmall from "../../assets/icons/heart small.svg";
import "../../styles/NavBar/Navbar.css";
const NavBar = () => {
  return (
    <nav>
      <h1>Exclusive</h1>

      <div className="nav-left">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Sign Up</a>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <SearchBar />
        <ul>
          <li>
            <a href="#">
              <img src={Cart1} alt="cart" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={heartSmall} alt="wishlist" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
