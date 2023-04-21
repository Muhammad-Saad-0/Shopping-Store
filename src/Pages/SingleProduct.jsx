import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/Products/SingleProduct.css";
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
      <section>
        {productsData.map((product)=>{
          return (
            <>
            <div className="images-section">
<img src={product.thumbnail} alt="" />
            </div>
            <div className="details">
              <div className="details-top">
                <p>{product.title}</p>
                <p>{product.rating}</p>
                <p>{product.stock > 0 ? 'In Stock':'Out of Stock'}</p>
                <p>{product.price}</p>
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
