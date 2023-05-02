import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import "../styles/Products/Products.css";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Data/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
const WishList = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(25);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        let user = auth.currentUser;
        const q = query(
          collection(db, "WishList"),
          where("uid", "==", user.uid)
        );

        const fetchProducts = async () => {
          const ProductsDB = await getDocs(q);
         ProductsDB.forEach((product)=>{
            setProductsData((prod)=>[...prod,{
                Id: product.data().productId ,
                 images: product.data().images,
                  title : product.data().title,
                   price:product.data().price, 
                   rating: product.data().rating,
            }])
         })
        setLoading(false)
        };
        // setTimeout(()=>{
        fetchProducts();
        // },500)
      } else {
        return false;
      }
    });
  }, []);

  //   let user = auth.currentUser;
  //   const q = query(collection(db, "WishList"), where("uid", "==", user.uid));

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         //   console.log(doc.id, " => ", doc.data());
  //         setProductsData(doc.data());
  //         console.log(productsData);
  //       });
  //     };
  //     // setTimeout(()=>{
  //     fetchProducts();

  //     // },500)
  //   }, []);

  //   useEffect(() => {
  //     fetchProducts();
  //   }, [limit]);
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
            <h3>WishList</h3>
          </div>
          <div className="products-grid">
            {productsData.map(({ id, images, title, price, rating }) => {
              return (
                <Link to={`product/${id}`} key={id}>
                  <img src={images[3] ? images[3] : images[0]} alt={title} />
                  <span className="products-info-container">
                    <p>
                      {title.length > 19 ? `${title.slice(0, 19)}...` : title}
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
          <div>
            {/* {limit < 100 && <button onClick={loadMore}>Load More</button>} */}
          </div>
        </section>
      )}
    </>
  );
};

export default WishList;
