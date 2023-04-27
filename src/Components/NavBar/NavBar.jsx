import React from "react";
import SearchBar from "./SearchBar";
import Cart1 from "../../assets/icons/Cart1.svg";
import heartSmall from "../../assets/icons/heart small.svg";
import userIcon from "../../assets/icons/user.svg"
import "../../styles/NavBar/Navbar.css";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <Link to="/" style={{color:"black",textDecoration:"none"}}>
      <h1>Exclusive</h1></Link>

      <div className="nav-left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about" href="#">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
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
          <li>
            <a href="#">
              <img src={userIcon} alt="profile" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
