import React from "react";
import "./Booking.css";

function Booking() {
  return (
    <main>
      <section className="main-container">
        <div className="how-to-book">
          <h2>HOW TO BOOK?</h2>
          <div className="inner-container">
            <ul className="listing">
              <li>ENTER SALONCODE PROVIDED AT SALON</li>
              <li>SIGN UP /LOG IN </li>
              <li>SELECT STYLIST FOR YOUR SERVICE </li>
              <li>CLICK ON "BOOK YOUR NAME"</li>
              <li>CHOOSE SERVICE & CLICK ON "BOOK NOW"</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Booking;
