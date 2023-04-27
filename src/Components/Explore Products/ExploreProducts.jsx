import React, { useEffect, useState, useRef } from "react";
import "../../styles/Categories/Categories.css";
import "../../styles/Products/Products.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import heart from "../../assets/icons/Fill Heart.svg";
import deleteIcon from "../../assets/icons/Frame 568.svg";
import { v4 as uuidv4 } from "uuid";
const AllProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [inWishlist, setInWishlist] = useState(false);
  const [clickedIDs, setClickedIDs] = useState([]);
  const fetchProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductsData(data.products);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
//   useEffect(() => {
//     console.log(clickedIDs);
//   }, [clickedIDs]);
//   useEffect(() => {
//     const handleIcon = (id)=>{   if (clickedIDs.includes(id)) {
//       return (
//         <img
//           className="wishlist-icon"
//           src={deleteIcon}
//           alt=""
//         />
//       );
//     }
//     if (!clickedIDs.includes(id)) {
//       return (
//         <img className="wishlist-icon" src={heart} alt="" />
//       );
//     }
//     if ((clickedIDs.length = 0)) {
//       return (
//         <img className="wishlist-icon" src={heart} alt="" />
//       );
//     }}
//  handleIcon()
//   }, [clickedIDs]);
  const idRef = useRef();
  return (
    <>
      <section className="all-products-section">
        <div>
          <h3>Explore Our Products</h3>
        </div>
        <div className="products-grid">
          {productsData
            .slice(0, 8)
            .map(({ id, images, title, price, rating }) => {
              return (
                <Link key={id} to={`products/product/${id}`}>
                  <div className="image-section">
                    <img src={images[3] ? images[3] : images[0]} alt={title} />
                    <button
                      id={id}
                      onClick={(e) => {
                        // if (!clickedIDs.includes(e.currentTarget.id)) {
                        // setClickedIDs([...clickedIDs, e.currentTarget.id]);
                        // }
                        e.stopPropagation();
                        e.preventDefault();
                        setInWishlist(!inWishlist);
                      }}
                    > 
                    {inWishlist?  <img
         className="wishlist-icon"
       src={deleteIcon}
        alt=""
       />:  <img
               className="wishlist-icon"
               src={heart}
               alt=""
            />}
                    </button>
                    
                  </div>

                  <span className="products-info-container">
                    <p>
                      {title.length > 19 ? `${title.slice(0, 19)}...` : title}
                    </p>
                    <span className="products-detail">
                      <p>${price}</p>
                      <div className="ratings">
                        {[1, 2, 3, 4, 5].map((r) => {
                          return (
                            <span key={uuidv4()}>
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
              // return (
              //   <div key={id}>
              //     <img src={images[3] ? images[3] : images[0]} alt={title} />
              //     <span className="products-info-container">
              //       <p>{title}</p>
              //       <span className="products-detail">
              //         <p>${price}</p>
              //         {[1, 2, 3, 4, 5].map((r) => {
              //           return (
              //             <span className="ratings">
              //               {r <= Math.round(rating) ? (
              //                 <AiFillStar style={{ color: "#FFDF00" }} />
              //               ) : (
              //                 <AiFillStar style={{ color: "grey" }} />
              //               )}
              //             </span>
              //           );
              //         })}
              //         <p>{`(${Math.round(rating)})`}</p>
              //       </span>
              //     </span>
              //   </div>
              // );
            })}
        </div>
        <Link to="/products" className="all-btn">
          View All Products
        </Link>
      </section>
    </>
  );
};

export default AllProducts;
