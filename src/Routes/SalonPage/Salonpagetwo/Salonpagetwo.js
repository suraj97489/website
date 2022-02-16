import React from "react";
import SalonpagetwoBodyTop from "./SalonpagetwoBodyTop/SalonpagetwoBodyTop";
import SalonpagetwoBodyBottom from "./SalonpagetwoBodyBottom/SalonpagetwoBodyBottom";
import ShopClosed from "./SalonpagetwoBodyBottom/ShopClosed/ShopClosed";

import Modal from "./../Modals/Modal";
import { useSelector } from "react-redux";
function Salonpagetwo() {
  const shopOpen = useSelector((state) => state.main.shopOpen);
  const isOpen = useSelector((state) => state.main.isOpen);
  return (
    <>
      <div className="salonpagetwo-body">
        <SalonpagetwoBodyTop />

        {shopOpen ? <SalonpagetwoBodyBottom /> : <ShopClosed />}
        {isOpen && <Modal />}
      </div>
    </>
  );
}

export default Salonpagetwo;
