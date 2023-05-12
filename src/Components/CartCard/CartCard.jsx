import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { doc, updateDoc, increment, where } from "firebase/firestore";
import { db, auth } from "../../Data/firebase";

const CartCard = ({ id, images, title, price, rating, quantity }) => {
  const [count, setCount] = useState(0);

  const increase = async () => {
    // console.log(rating);
    setCount(count + 1);

    await updateDoc(
      doc(db, "Cart", `Product ${id}`),
      {
        quantity: increment(1),
      }
    );
  };
  const decrease = async () => {
    setCount((prev) => {
      if (prev <= 1) return 1;
      return prev - 1;
    });
    if (quantity > 1) {
      await updateDoc(
        doc(db, "Cart", `Product ${id}`),
        {
          quantity: increment(-1),
        }
      )
    }
  ;
  };
  return (
    <div className="product-details">
      <span>
        <img src={images[0]} alt="" />
        <p>{title.length > 12 ? `${title.slice(0, 12)}...` : title}</p>
      </span>
      <p>${price}</p>

      <div className="counter">
        <button onClick={decrease}>
          <AiOutlineDown />
        </button>
        <p className="count">{quantity}</p>

        <button onClick={()=>{increase(id)}}>
          {" "}
          <AiOutlineDown />
        </button>
      </div>

      <p>${quantity * price}</p>
    </div>
  );
};

export default CartCard;
