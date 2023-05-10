import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import "../styles/Products/Products.css";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Data/firebase";
import { collection, query, where, getDocs ,deleteDoc,onSnapshot} from "firebase/firestore";
import Footer from '../Components/Footer/Footer'
import ProductCard from "../Components/ProductsCard/ProductCard";
import deleteIcon from "../assets/icons/Frame 568.svg";
import { v4 as uuidv4 } from "uuid";

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

    onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc)=>{
        return {
            Id: doc.data().productId ,
             images: doc.data().images,
              title : doc.data().title,
               price:doc.data().price, 
               rating: doc.data().rating,
        }
      })
      setProductsData(newData)
          });
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
  const deleteWishlist = async (Id) => {
    console.log(Id);
    const docRef = (db, "WishList", `Product ${Id}`);
    console.log(docRef);
    const docSnap = await getDoc(doc(db, "WishList", `Product ${Id}`));
    try {
      if (docSnap.exists()) {
        await deleteDoc(
          doc(db, "WishList", `Product ${Id}`),
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
        <section className="all-products-section">
          <div>
            <h3>WishList</h3>
          </div>
          <div className="products-grid">
            {productsData.map(({ Id, images, title, price, rating }) => {
        
              return (
                <Link to={`product/${Id}`} key={uuidv4()}>
                  <div className="image-section">
          <img src={images[3] ? images[3] : images[0]} alt={title} />
         
            <button
              id={Id}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                deleteWishlist(Id);
              }}
            >
              <img className="wishlist-icon" src={deleteIcon} alt="" />
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
                // <ProductCard id={id} images={images} title={title} price={price} rating={rating}/>
              );
            })}
          </div>
          <div>
            {/* {limit < 100 && <button onClick={loadMore}>Load More</button>} */}
          </div>
        </section>
      )}
      <section className="about-footer">
      <Footer />

      </section>
    </>
  );
};

export default WishList;
