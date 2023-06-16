import React, { useEffect, useState, useRef } from "react";

import { Link, useNavigate} from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import heart from "../../assets/icons/Fill Heart.svg";
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
import deleteIcon from "../../assets/icons/Frame 568.svg";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ProductCard = ({ id, images, title, price, rating }) => {
  const [signedIn,SetSignedIn] = useState(false)
  const navigate = useNavigate()
  const [inWishlist, setInWishlist] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        SetSignedIn(true)
      } else {
        SetSignedIn(false);
return false;
      }
    });
  }, []);
  const addToWishlist = async (id, images, title, price, rating) => {
    await setDoc(doc(db, "WishList", `Product ${id}`), {
      uid: auth.currentUser.uid,
      productId: id,
      images: images,
      title: title,
      price: price,
      rating: rating,
    });
  };
  const deleteWishlist = async (id) => {
    console.log(id);
    const docRef = (db, "WishList", `Product ${id}`);
    console.log(docRef);
    const docSnap = await getDoc(doc(db, "WishList", `Product ${id}`));
    try {
      if (docSnap.exists()) {
        await deleteDoc(
          doc(db, "WishList", `Product ${id}`),
          where("uid", "==", auth.currentUser.uid)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        const checkWishlist = async () => {

          // const docRef = (db, "WishList", `Product ${id}`);
      
          const docSnap = await getDoc(doc(db, "WishList", `Product ${id}`));
          console.log(docSnap.data());
          try {
            if (docSnap.exists() && docSnap.data().uid === auth.currentUser.uid) {
            setInWishlist(true)
            }
          } catch (error) {
            console.log(error);
          }
        };
        // setTimeout(()=>{
          checkWishlist()

        // },500)
      } else {
        return false;
      }
    });
  }, []);
  const notifyAdded = () => toast.success(' Added to Wishlist!', {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const notifyDel = () => toast.error(' Removed from Wishlist!', {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
   const navigateTo = ()=>{
if(signedIn){
  notifyAdded();
}else{
  navigate('/signup')
}
   }
  return (
    <>
       

      <Link id={id} key={id} to={`/products/product/${id}`}>
   
        <div className="image-section">
          <img src={images[3] ? images[3] : images[0]} alt={title} />
          {inWishlist ? (
            <button
              id={id}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setInWishlist(false);
                deleteWishlist(id);
                notifyDel()

              }}
            >
              <img className="wishlist-icon" src={deleteIcon} alt="" />
            </button>
          ) : (
            <button
              id={id}
              onClick={(e) => {
                addToWishlist(id, images, title, price, rating);
                e.stopPropagation();
                e.preventDefault();
                setInWishlist(true);
                navigateTo()
              }}
            >
              <img className="wishlist-icon" src={heart} alt="" />
            </button>
            
          )}
          
        </div>

        <span className="products-info-container">
          <p>{title.length > 19 ? `${title.slice(0, 19)}...` : title}</p>
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

      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate autem blanditiis, maiores itaque repellat id dolorem labore repellendus doloremque sit cumque nam asperiores modi sed! Rem totam ipsam debitis. Rem.</p> */}
    </>
  );
};

export default ProductCard;
