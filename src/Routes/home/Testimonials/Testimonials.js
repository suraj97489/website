import React from "react";
import Testimonialsingle from "./Testimonialsingle";
import "./Testimonials.css";

function Testimonials() {
  return (
    <>
      <div className="testimonial-container">
        <h2>TESTIMONIALS</h2>
        {/* <i className="fas fa-caret-square-right"></i>
                <i className="fas fa-caret-square-left"></i> */}
        <div className="testimonial-inner">
          <div className="testi-hidden">
            <Testimonialsingle name="Mahesh Sawant" salon="Navayug Salon" />
            <Testimonialsingle name="Aanand Zende" salon="AZ Salon" />
            <Testimonialsingle name="Dinesh Lad" salon="Bled " />
            <Testimonialsingle name="Nilesh Kashid" salon="Bizzare Salon" />
            <Testimonialsingle name="Sourabh Patil" salon="STYLISH" />
            <Testimonialsingle name="Vivek Kambale" salon="VK style" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonials;
