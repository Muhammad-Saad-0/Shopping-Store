import React, { useEffect, useState, useRef } from "react";
import "../../styles/Categories/Categories.css";
import "../../styles/All Products/AllProducts.css"
import {AiFillStar} from 'react-icons/ai'
const AllProducts = () => {
    const [productsData, setProductsData] = useState([])

    const fetchProducts = () => {
      fetch("https://dummyjson.com/products")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setProductsData(data.products)
        })
    }
    useEffect(() => {
        fetchProducts()
        console.log(productsData);
      }, [])
  return (
    <>
      <section className="all-products-section">
        <div>
          <h3>Explore Our Products</h3>
        </div>
        <div>
            {productsData.slice(0,8).map(({brand,id,images,title,price,rating})=>{
                return (
<div key={id}>
    <img src={images[3]?images[3]:images[0]} alt={title} />
    <span>
        <p>{title}</p>
        <span>
            <p>{price}$</p>
{[1,2,3,4,5].map((r)=>{
    return( 
        <span>{r <= Math.round(rating) ? (<AiFillStar style={{color: '#FFDF00'}}/>):(<AiFillStar style={{color: 'grey'}} />)}</span>
    )

})}
<p>{Math.round(rating)}</p>
        </span>
    </span>
</div>
                )
            })}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
