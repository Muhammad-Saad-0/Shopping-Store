import React, { useEffect, useState, useRef } from "react";
import "../../styles/Categories/Categories.css";
import "../../styles/Products/Products.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import heart from "../../assets/icons/Fill Heart.svg";
import deleteIcon from "../../assets/icons/Frame 568.svg";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import {
  getDocs,
  collection,
  Firestore,
  where,
  query,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../Data/firebase";
import ProductCard from "../ProductsCard/ProductCard";

const AllProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [inWishlist, setInWishlist] = useState(false);
  const [clickedIDs, setClickedIDs] = useState([]);
  const [prodID, setProdID] = useState("");

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
  // useEffect(() => {
  //   auth.onAuthStateChanged(function (user) {
  //     if (user) {
  //       const checkWishlist = async () => {
  //         let user = auth.currentUser;
  //         const q = query(
  //           collection(db, "WishList"),
  //           where("uid", "==", user.uid)
  //         );
  //         const querySnapshot = await getDocs(q);
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
  //         });
  //         checkWishlist();
  //       };
  //     } else {
  //       return false;
  //     }
  //   });
  // }, []);
  
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
               
              <ProductCard id={id} images={images} title={title} price={price} rating={rating}/>
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
