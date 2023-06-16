import React from "react";
import { Link } from "react-router-dom";
import "../../styles/SideBar/sidebar.css";

const Sidebar = ({ handleCallBack }) => {
  return (
    // <section className='sidebar-bg'>
    <aside>
      <ul>
        <li
          onClick={() => {
            handleCallBack(false);
          }}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => {
            handleCallBack(false);
          }}>
          <Link to="/about" href="#">
            About Us
          </Link>
        </li>
        <li
          onClick={() => {
            handleCallBack(false);
          }}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </aside>
    // </section>
  );
};

export default Sidebar;
