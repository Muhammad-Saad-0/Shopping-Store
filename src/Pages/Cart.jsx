import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import "../styles/cart/cart.css";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Data/firebase";
import { AiOutlineDown } from "react-icons/ai";

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import Footer from "../Components/Footer/Footer";
import ProductCard from "../Components/ProductsCard/ProductCard";
import deleteIcon from "../assets/icons/Frame 568.svg";
import { v4 as uuidv4 } from "uuid";
import CartCard from "../Components/CartCard/CartCard";

const Cart = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(1);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount((prevCount) => {
      if (prevCount <= 1) return 1;
      return prevCount - 1;
    });
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        let user = auth.currentUser;
        const q = query(collection(db, "Cart"), where("uid", "==", user.uid));

        const fetchProducts = async () => {
          onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((doc) => {
              return {
                Id: doc.data().productId,
                images: doc.data().images,
                title: doc.data().title,
                price: doc.data().price,
                rating: doc.data().rating,
                quantity: doc.data().quantity,
              };
            });
            setProductsData(newData);
          });
          setLoading(false);
        };
        // setTimeout(()=>{
        fetchProducts();
        // },500)
      } else {
        return false;
      }
    });
  }, []);

  const deleteCart = async (Id) => {
    console.log(Id);
    const docRef = (db, "Cart", `Product ${Id}`);
    console.log(docRef);
    const docSnap = await getDoc(doc(db, "Cart", `Product ${Id}`));
    try {
      if (docSnap.exists()) {
        await deleteDoc(
          doc(db, "Cart", `Product ${Id}`),
          where("uid", "==", auth.currentUser.uid)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <section className="cart-section">
          <div className="cart-section-top">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          <section className="product-section">
            {productsData.map(({id, images, title, price, rating ,quantity}) => {
              
              return (
                // <div className="product-details">
                //   <span>
                //     <img src={product.images[0]} alt="" />
                //     <p>{product.title}</p>
                //   </span>
                //   <p>{product.price}</p>
                
                //   <div className="counter">
                //       <button onClick={decrease}>
                //         <AiOutlineDown />
                //       </button>
                //       <p className="count">{count}</p>

                //       <button onClick={increase}>
                //         {" "}
                //         <AiOutlineDown />
                //       </button>
                //     </div>

                //   <p>{product.quantity * product.price}</p>
                // </div>
                <CartCard  id={id} images={images} title={title} price={price} rating={rating} quantity={quantity}/>
              );
            })}
          </section>
          <section className="cart-page-buttons-container">
            <button>Return To Shop</button>
            <button>Update Cart</button>
          </section>
          <section className="cart-section-bottom">
            <div className="cart-total">
              <p>Cart Total</p>
              <span>
                <p>Subtotal:</p>
                <p>$1750</p>
              </span>
              <span>
                <p>Shipping:</p>
                <p>Free</p>
              </span>
              <span>
                <p>Total:</p>
                <p>$1750</p>
              </span>
              <div>
                <button>Proceed to Checkout</button>
              </div>
            </div>
          </section>
        </section>
        // <section className="all-products-section">
        //   <div>
        //     <h3>Cart</h3>
        //   </div>
        //   <div className="products-grid">
        //     {productsData.map(({ Id, images, title, price, rating }) => {

        //       return (
        //         <Link to={`/products/product/${Id}`} key={uuidv4()}>
        //           <div className="image-section">
        //   <img src={images[3] ? images[3] : images[0]} alt={title} />

        //     <button
        //       id={Id}
        //       onClick={(e) => {
        //         e.stopPropagation();
        //         e.preventDefault();
        //         deleteCart(Id);
        //       }}
        //     >
        //       <img className="Cart-icon" src={deleteIcon} alt="" />
        //     </button>

        // </div>
        //           <span className="products-info-container">
        //             <p>
        //               {title.length > 19 ? `${title.slice(0, 19)}...` : title}
        //             </p>
        //             <span className="products-detail">
        //               <p>${price}</p>
        //               <div className="ratings">
        //                 {[1, 2, 3, 4, 5].map((r) => {
        //                   return (
        //                     <span key={uuidv4()}>
        //                       {r <= Math.round(rating) ? (
        //                         <AiFillStar style={{ color: "#FFDF00" }} />
        //                       ) : (
        //                         <AiFillStar style={{ color: "grey" }} />
        //                       )}
        //                     </span>
        //                   );
        //                 })}
        //                 <p>{`(${Math.round(rating)})`}</p>
        //               </div>
        //             </span>
        //           </span>
        //         </Link>
        //         // <ProductCard id={id} images={images} title={title} price={price} rating={rating}/>
        //       );
        //     })}
        //   </div>
        //   <div>
        //     {/* {limit < 100 && <button onClick={loadMore}>Load More</button>} */}
        //   </div>
        // </section>
      )}
      <section className="about-footer">{/* <Footer /> */}</section>
    </>
  );
};

export default Cart;
