import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

const CartCard = ({ id, images, title, price, rating, quantity }) => {
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
  return (
    <div className="product-details">
      <span>
        <img src={images[0]} alt="" />
        <p>{title.length > 12 ? `${title.slice(0, 12)}...` : title}</p>
      </span>
      <p>{price}</p>

      <div className="counter">
        <button onClick={decrease}>
          <AiOutlineDown />
        </button>
        <p className="count">{count}</p>

        <button onClick={increase}>
          {" "}
          <AiOutlineDown />
        </button>
      </div>

      <p>{quantity * price}</p>
    </div>
  );
};

export default CartCard;
