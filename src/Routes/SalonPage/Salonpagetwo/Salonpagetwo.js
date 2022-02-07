import React, { useContext } from "react";
import SalonpagetwoBodyTop from "./SalonpagetwoBodyTop/SalonpagetwoBodyTop";
import SalonpagetwoBodyBottom from "./SalonpagetwoBodyBottom/SalonpagetwoBodyBottom";
import ShopClosed from "./SalonpagetwoBodyBottom/ShopClosed/ShopClosed";
import Maincontext from "./../../../context/MainContext";
import Modal from "./../Modals/Modal";

function Salonpagetwo() {
  const maincontext = useContext(Maincontext);

  return (
    <>
      <div className="salonpagetwo-body">
        <SalonpagetwoBodyTop />

        {maincontext.shopOpen ? <SalonpagetwoBodyBottom /> : <ShopClosed />}
        {maincontext.isOpen && <Modal />}
      </div>
    </>
  );
}

export default Salonpagetwo;
