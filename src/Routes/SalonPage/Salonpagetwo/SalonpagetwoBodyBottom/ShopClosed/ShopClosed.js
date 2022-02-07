import React from "react";
import "./ShopClosed.css";
function ShopClosed() {
  return (
    <>
      <div className="ShopClosed__container">
        <img
          style={{ width: "100%", objectFit: "contain" }}
          src="./images/ShopClosed.jpg"
        ></img>
      </div>
    </>
  );
}

export default ShopClosed;
