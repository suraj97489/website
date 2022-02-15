import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="big-container">
          <div className="div1">
            <h2>SALONKATTA</h2>
            <div>
              <p>1472/21, "D" ward, Shukrawar peth maskuti talav,kolhapur</p>

              <p>info@salonkatta.com</p>
            </div>
          </div>
          <div className="div2">
            <strong>GET TO KNOW US</strong>
            <p>-About us</p>
            <p>-Contact us</p>
            <p>-Why choose SALONKATTA?</p>
            <p>-FAQ</p>
            <p>-Help</p>
          </div>
          <div className="div3">
            <strong>make money with us</strong>
            <p> -Become a Vendor</p>
            <p> -Advertise Your Products</p>
            <p>-Become a Franchisee</p>
          </div>
          <div className="div4">
            <strong>connect with us</strong>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>
        <div className="divbottom"></div>
      </footer>
    </>
  );
}

export default Footer;
