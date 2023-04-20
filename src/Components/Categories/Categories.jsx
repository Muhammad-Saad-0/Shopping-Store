import React, { useEffect, useState, useRef } from "react";
import categories from "../../Data/Categories";
import "../../styles/Categories/Categories.css";
import RightArrow from '../../assets/icons/RightArrow.svg'
import { Link } from "react-router-dom";
const Categories = () => {
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <>
      <section className="categories-section">
        <div>
          <h3>Browse By Category</h3>
          <span>
            {" "}
            <button onClick={() => scroll(-170)}>
                <img src={RightArrow} alt="left" />
            </button>
            <button onClick={() => scroll(170)}>
                <img src={RightArrow} alt="right" />
            </button>
          </span>
        </div>
        <div className="categories-flex" ref={ref}>
          {categories.map(({ name, Icon }) => {
            return (
              <Link to={`products/category/${name}`} style={{textDecoration:"none"}}>
                <span>
                  <Icon className="icon" />
                </span>
                <p>{name}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Categories;
