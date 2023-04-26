import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import "../styles/Products/Products.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const SingleProducts = () => {
  const { categoryId } = useParams();
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products/category/${categoryId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);

        setProductsData(data.products);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
      // setLoading(false)
    }, 500);
    console.log(productsData);
  }, []);
  //   useEffect(() => {
  //     setTimeout(()=>{
  // setLoading(false)
  //     },700)
  //   }, [productsData]);
  return (
    <>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <section className="all-products-section">
          <div>
            <h3>{categoryId}</h3>
          </div>

          <div className="products-grid">
            {productsData.map(({ brand, id, images, title, price, rating }) => {
              return (
                <Link to={`/products/product/${id}`} key={id}>
                  <img src={images[3] ? images[3] : images[0]} alt={title} />
                  <span className="products-info-container">
                    <p>
                      {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </p>
                    <span className="products-detail">
                      <p>${price}</p>
                      <div className="ratings">
                      {[1, 2, 3, 4, 5].map((r) => {
                        return (
                          <span>
                            {r <= Math.round(rating) ? (
                              <AiFillStar style={{ color: "#FFDF00" }} />
                            ) : (
                              <AiFillStar style={{ color: "grey" }} />
                            )}
                          </span>
                        );
                      })}
                      <p>{`(${Math.round(rating)})`}</p>

                      </div>
                   
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      {/* {loading && <span class="loader"></span>}

      {!loading && (
        <section className="all-products-section">
          <div>
            <h3>{categoryId}</h3>
          </div>

          <div className="products-grid">
            {productsData.map(({ brand, id, images, title, price, rating }) => {
              return (
                <div key={id}>
                  <img src={images[3] ? images[3] : images[0]} alt={title} />
                  <span className="products-info-container">
                    <p>
                      {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </p>
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
      )} */}
    </>
  );
};

export default SingleProducts;
