import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/Products/SingleProduct.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import heart from "../assets/icons/Fill Heart.svg";
import { doc, setDoc } from "firebase/firestore";
import { where, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../Data/firebase";
import deleteIcon from "../assets/icons/Frame 568.svg";
const SingleProduct = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [count, setCount] = useState(1);
  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log([data]);
        setProductsData([data]);
        // setLoading(false);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount((prevCount) => {
      if (prevCount <= 1) return 1;
      return prevCount - 1;
    });
  };
  const addToWishlist = async (id, images, title, price, rating) => {
    await setDoc(doc(db, "WishList", `Product ${productId}`), {
      uid: auth.currentUser.uid,
      productId: id,
      images: images,
      title: title,
      price: price,
      rating: rating,
    });
  };
  const deleteWishlist = async () => {
    const docRef = (db, "WishList", `Product ${productId}`);
    console.log(docRef);
    const docSnap = await getDoc(doc(db, "WishList", `Product ${productId}`));
    try {
      if (docSnap.exists()) {
        await deleteDoc(
          doc(db, "WishList", `Product ${productId}`),
          where("uid", "==", auth.currentUser.uid)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkWishlist = async () => {
    // const docRef = (db, "WishList", `Product ${id}`);

    const docSnap = await getDoc(doc(db, "WishList", `Product ${productId}`));
    try {
      if (docSnap.exists()) {
        setInWishlist(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkCart = async () => {
    // const docRef = (db, "WishList", `Product ${id}`);

    const docSnap = await getDoc(doc(db, "Cart", `Product ${productId}`));
    try {
      if (docSnap.exists()) {
        setInCart(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect( () => {
  const  checking = async ()=>{
      await checkCart()
      await checkWishlist();
      setLoading(false);
    }
  checking()

  }, []);
  const AddtoCart = async (id, images, title, price, rating) => {
    await setDoc(doc(db, "Cart", `Product ${productId}`), {
      uid: auth.currentUser.uid,
      productId: id,
      images: images,
      title: title,
      price: price,
      rating: rating,
      quantity: count,
    });
  };
  return (
    <>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <section className="single-product">
          {productsData.map((product) => {
            return (
              <>
                <div className="images-section">
                  <img src={product.thumbnail} alt="" />
                </div>
                <div className="details">
                  <div className="details-top">
                    <p>{product.title}</p>
                    <div className="ratings">
                      {[1, 2, 3, 4, 5].map((r) => {
                        return (
                          <span>
                            {r <= Math.round(product.rating) ? (
                              <AiFillStar style={{ color: "#FFDF00" }} />
                            ) : (
                              <AiFillStar style={{ color: "grey" }} />
                            )}
                          </span>
                        );
                      })}
                      <p>{`(${Math.round(product.rating)})`}</p>
                      <p
                        className="stock"
                        style={{ color: product.stock > 0 ? "green" : "red" }}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>

                    <p>${product.price}.00</p>
                    <p>{product.description}</p>
                  </div>
                  <div className="details-bottom">
                    <div className="counter">
                      <button onClick={decrease}>
                        <AiOutlineMinus />
                      </button>
                      <p className="count">{count}</p>

                      <button onClick={increase}>
                        {" "}
                        <AiOutlinePlus />
                      </button>
                    </div>
                    {inCart ? (
                      <button
                        onClick={() => {
                          AddtoCart(
                            product.id,
                            product.images,
                            product.title,
                            product.price,
                            product.rating
                          );
                          setInCart(false);
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          AddtoCart(
                            product.id,
                            product.images,
                            product.title,
                            product.price,
                            product.rating
                          );
                          setInCart(true);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}

                    {inWishlist ? (
                      <button
                        className="wishlist"
                        id={productId}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setInWishlist(false);
                          deleteWishlist();
                        }}
                      >
                        <img
                          className="wishlist-icon"
                          src={deleteIcon}
                          alt=""
                        />
                      </button>
                    ) : (
                      <button
                        className="wishlist"
                        id={productId}
                        onClick={(e) => {
                          addToWishlist(
                            product.id,
                            product.images,
                            product.title,
                            product.price,
                            product.rating
                          );
                          e.stopPropagation();
                          e.preventDefault();
                          setInWishlist(true);
                        }}
                      >
                        <img className="wishlist-icon" src={heart} alt="" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </section>
      )}
    </>
  );
};

export default SingleProduct;
