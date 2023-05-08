import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import "../styles/Products/Products.css";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductsCard/ProductCard";

const AllProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(25);

  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products?limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductsData(data.products);
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  useEffect(() => {
    fetchProducts();
  }, [limit]);
  const loadMore = () => {
    setLimit((prev) => prev + 25);
  };
  return (
    <>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <section className="all-products-section">
          <div>
            <h3>Explore Our Products</h3>
          </div>
          <div className="products-grid">
            {productsData.map(({id, images, title, price, rating }) => {
              return (
                // <Link to={`product/${id}`} key={id}>
                //   <img src={images[3] ? images[3] : images[0]} alt={title} />
                //   <span className="products-info-container">
                //     <p>
                //       {title.length > 19 ? `${title.slice(0, 19)}...` : title}
                //     </p>
                //     <span className="products-detail">
                //       <p>${price}</p>
                //       <div  className="ratings">
                //         {[1, 2, 3, 4, 5].map((r) => {
                //           return (
                //             <span>
                //               {r <= Math.round(rating) ? (
                //                 <AiFillStar style={{ color: "#FFDF00" }} />
                //               ) : (
                //                 <AiFillStar style={{ color: "grey" }} />
                //               )}
                //             </span>
                //           );
                //         })}
                //         <p>{`(${Math.round(rating)})`}</p>
                //       </div>
                //     </span>
                //   </span>
                // </Link>
                <ProductCard id={id} images={images} title={title} price={price} rating={rating}/>
              );
            })}
          </div>
          <div>
            {limit < 100 && <button onClick={loadMore}>Load More</button>}
          </div>
        </section>
      )}
    </>
  );
};

export default AllProducts;
