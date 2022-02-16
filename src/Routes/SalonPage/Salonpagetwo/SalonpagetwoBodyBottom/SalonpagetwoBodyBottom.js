import React from "react";
import Serviceproviderslist from "./Serviceproviderslist/Serviceproviderslist";
import "./SalonpagetwoBodyBottom.css";

import { useSelector } from "react-redux";

function SalonpagetwoBodyBottom() {
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);

  return (
    <>
      <div className="salonpagetwo-body-bottom">
        {serviceproviders.map((provider, i) => {
          return (
            <Serviceproviderslist
              key={provider.id}
              providerPhoto={provider.providerPhoto}
              fname={provider.fname}
              lname={provider.lname}
              id={provider.id}
              bookingOn={provider.bookingOn}
              list={provider.customers}
              index={i}
            />
          );
        })}
      </div>
    </>
  );
}

export default SalonpagetwoBodyBottom;
