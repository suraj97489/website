import React, { useContext } from "react";
import Serviceproviderslist from "./Serviceproviderslist/Serviceproviderslist";
import "./SalonpagetwoBodyBottom.css";
import Maincontext from "../../../../context/MainContext";

function SalonpagetwoBodyBottom() {
  const maincontext = useContext(Maincontext);

  return (
    <>
      <div className="salonpagetwo-body-bottom">
        {maincontext.serviceproviders.map((provider, i) => {
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
