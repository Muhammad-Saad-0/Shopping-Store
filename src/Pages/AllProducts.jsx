import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import "../styles/All Products/AllProducts.css";

const AllProducts = () => {
  const [productsData, setProductsData] = useState([]);

  const fetchProducts = () => {
    fetch("https://dummyjson.com/products?limit=0")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductsData(data.products);
      });
  };
  useEffect(() => {
    setTimeout(()=>{
      fetchProducts();

    },1000)
    console.log(productsData);
  }, []);
  return (
    <section className="all-products-section">
    <div>
      <h3>Explore Our Products</h3>
    </div>
    <span class="loader"></span>
    <div className="products-grid">
      {productsData.map(({ brand, id, images, title, price, rating }) => {
          return (
            <div key={id}>
              <img src={images[3] ? images[3] : images[0]} alt={title} />
              <span className="products-info-container">
                <p>{title.length > 30 ?`${title.slice(0,30)}...`: title}</p>
                <span className="products-detail">
                  <p>${price}</p>
                  {[1, 2, 3, 4, 5].map((r) => {
                    return (
                      <span className="ratings">
                        {r <= Math.round(rating) ? (
                          <AiFillStar style={{ color: "#FFDF00" }} />
                        ) : (
                          <AiFillStar style={{ color: "grey" }} />
                        )}
                      </span>
                    );
                  })}
                  <p>{`(${Math.round(rating)})`}</p>
                </span>
              </span>
            </div>
          );
        })}
    </div>
  </section>
  )
}

export default AllProducts