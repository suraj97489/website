import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebaseproduction";
import "./Contactus.css";

function Contactus() {
  const defaultFormData = { fname: "", lname: "", email: "", message: "" };

  const [formData, setFormData] = useState(defaultFormData);

  function formSubmitHandler(e) {
    e.preventDefault();
    const payLoad = { ...formData, time: serverTimestamp() };
    const colRef = collection(db, "contactUs");
    addDoc(colRef, payLoad).then(() => {
      setFormData(defaultFormData);
    });
  }
  return (
    <>
      <div className="contactus">
        <h2>Contact Us</h2>
        <div className="contactus__container1">
          <div className="contactus__container1__left">
            1472/21,D WARD ,SHUKRAWAR PETH ,MASKUTI TALAV,KOLHAPUR.
            <br />
            8484845040
            <br />
            info@salonkatta.com
          </div>
          <div className="contactus__container1__right">
            <iframe
              title="googlemap"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.5276315946176!2d74.2143365141781!3d16.70050502664795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1ab185c3b3307%3A0x17fe01b5b11c1d78!2sSuraj%20SA%20Art!5e0!3m2!1sen!2sin!4v1635680239707!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="contactus__container2">
          <h2>HOW CAN WE HELP YOU?</h2>

          <form
            onSubmit={formSubmitHandler}
            className="contactus__container2__form"
          >
            <div className="contactus__labelandiput">
              <label htmlFor="fname">First name:</label>
              <br />
              <input
                type="text"
                className="contactus__container2__iputfname resizeinput"
                name="fname"
                value={formData.fname}
                onChange={(e) => {
                  setFormData({ ...formData, fname: e.target.value });
                }}
              />
            </div>
            <br />

            <div className="contactus__labelandiput">
              <label htmlFor="lname">Last name:</label>
              <br />
              <input
                type="text"
                className="contactus__container2__iputlname resizeinput"
                name="lname"
                value={formData.lname}
                onChange={(e) => {
                  setFormData({ ...formData, lname: e.target.value });
                }}
              />
            </div>
            <br />

            <div className="contactus__labelandiput">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="email"
                className="contactus__container2__iputemail resizeinput"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>
            <br />

            <div className="contactus__labelandiput">
              <label htmlFor="message">Message:</label>
              <br />
              <textarea
                type="text"
                className="contactus__container2__iputmessage resizeinput"
                name="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                }}
              />
            </div>
            <button type="submit" className="contactus__submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contactus;
