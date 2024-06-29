import React from "react";

// widget component
export default function Widget({ title, price, quantity, list }) {
  return (
    <div className="widget-container">
      <h6>{title}</h6>
      <div className="d-flex">
        <div className="d-flex flex-column">
          <span>{price}</span>
          {list.map((bid, index) => (
            <span key={index}>{bid.price ? bid.price : 0}</span>
          ))}
        </div>
        <div className="d-flex flex-column px-4">
          <span>{quantity}</span>
          {list.map((bid, index) => (
            <span key={index}>{bid.size ? bid.size : 0}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
