import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import "../styles/cart/cart.css";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Data/firebase";
import { AiOutlineDown } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import Footer from "../Components/Footer/Footer";
import CartCard from "../Components/CartCard/CartCard";

const Cart = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("");
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
  const CallBack = (childData) =>{
    
      setTotal(childData)

    // console.log(total);
  }
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
            {productsData.map(
              ({ Id, images, title, price, rating, quantity }) => {
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
                  <CartCard
                  key={uuidv4()}
                    id={Id}
                    images={images}
                    title={title}
                    price={price}
                    rating={rating}
                    quantity={quantity}
                    handleCallBack={CallBack}
                  />
                );
              }
            )}
          </section>
          {/* <section className="cart-page-buttons-container">
            <button>Return To Shop</button>
            <button>Update Cart</button>
          </section> */}
          <section className="cart-section-bottom">
            <div className="cart-total">
              <p>Cart Total</p>
              <span>
                <p>Subtotal:</p>
                <p>${total}</p>
              </span>
              <span>
                <p>Shipping:</p>
                <p>Free</p>
              </span>
              <span>
                <p>Total:</p>
                <p>${total}</p>
              </span>
              <div>
                <button>Proceed to Checkout</button>
              </div>
            </div>
          </section>
        </section>
      )}
      {!loading && (
        <section className="cart-footer">
          <Footer />
        </section>
      )}
    </>
  );
};

export default Cart;
