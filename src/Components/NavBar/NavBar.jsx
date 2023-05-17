import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Cart1 from "../../assets/icons/Cart1.svg";
import heartSmall from "../../assets/icons/heart small.svg";
import userIcon from "../../assets/icons/user.svg";
import "../../styles/NavBar/Navbar.css";
import { Link } from "react-router-dom";
import { db, auth } from "../../Data/firebase";
import {
  collection,
  query,
  where,
  getCountFromServer,
  onSnapshot,
} from "firebase/firestore";

const NavBar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [WLCount, setWLCount] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        let user = auth.currentUser;
        const q = query(collection(db, "Cart"), where("uid", "==", user.uid));
        const getCartCount = async () => {
          onSnapshot(q, (querySnapshot) => {
            setCartCount(querySnapshot.docs.length);
          });
        };
        const q2 = query(
          collection(db, "WishList"),
          where("uid", "==", user.uid)
        );
        const getWLCount = async () => {
          onSnapshot(q2, (querySnapshot) => {
            setWLCount(querySnapshot.docs.length);
          });
        };
        getWLCount();
        getCartCount();
      } else {
        return false;
      }
    });
  }, []);

  return (
    <nav>
      <Link to="/" style={{ color: "black", textDecoration: "none" }}>
        <h1>Exclusive</h1>
      </Link>

      <div className="nav-left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about" href="#">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <SearchBar />
        <ul>
          <li className="cart">
            <Link to="/cart">
              <span class="count">{cartCount}</span>
              <img className="icons" src={Cart1} alt="cart" />
            </Link>
          </li>
          <li className="cart">
            <Link to="/wishlist">
            <span class="count">{WLCount}</span>
              <img className="icons"  src={heartSmall} alt="wishlist" />
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <img src={userIcon} alt="profile" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
