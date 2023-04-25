import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/Products/SingleProduct.css";
import { AiFillStar } from "react-icons/ai";
const SingleProduct = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products/1`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log([data]);
        setProductsData([data]);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      {loading ? <span className="loader"></span> : 
      <section className="single-product">
        {productsData.map((product)=>{
          return (
            <>
            <div className="images-section">
<img src={product.thumbnail} alt="" />
            </div>
            <div className="details">
              <div className="details-top">
                <p>{product.title}</p>
                <div  className="ratings">
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
                        <p className="stock" style={{color:product.stock > 0 ? 'green':'red'}}>{product.stock > 0 ? 'In Stock':'Out of Stock'}</p>
                      </div>
            
                <p>${product.price}.00</p>
                <p>{product.description}</p>
              </div>
            </div>
            </>
          )
        })}
      </section>
      }
    </>
  );
};

export default SingleProduct;
