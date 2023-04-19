import React from "react";
import Icon1 from "../../assets/icons/icon-delivery.svg";
import Icon2 from "../../assets/icons/Icon-Customer service.svg";
import Icon3 from "../../assets/icons/Icon-secure.svg";
import "../../styles/Services/Services.css";
import arrow from "../../assets/icons/RightArrow.svg";
const Services = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="services-section">
      <div className="services-grid">
        <div>
          <img src={Icon1} alt="" />
          <p className="bold-text">FREE AND FAST DELIVERY</p>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div>
          <img src={Icon2} alt="" />
          <p className="bold-text">24/7 CUSTOMER SERVICE</p>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div>
          <img src={Icon3} alt="" />
          <p className="bold-text">MONEY BACK GUARANTEE</p>
          <p>We return money within 30 days</p>
        </div>
      </div>
      <button onClick={scrollToTop}>
        <img style={{ transform: "rotate(270deg)" }} src={arrow} alt="top" />
      </button>
    </div>
  );
};

export default Services;
