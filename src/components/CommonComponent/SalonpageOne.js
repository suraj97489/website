import React, { useContext, useEffect } from "react";
import "./SalonpageOne.css";
import Maincontext from "./../../context/MainContext";
import UserContext from "./../../context/UserContext";

function SalonpageOne() {
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);

  useEffect(() => {
    let cancel = false;
    function checkAndUpdateSalonProvidersforDisplay() {
      if (cancel) return;
      if (
        maincontext.serviceproviders?.length !==
        usercontext.salonProvidersfordisplay?.length
      ) {
        usercontext.updateSalonProvidersforDisplay();
      }
    }
    checkAndUpdateSalonProvidersforDisplay();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <div className="salonpage-container">
        <div className="salonpage-inner">
          <div className="salonpage-left">
            <h2>{maincontext.salon?.salonName}</h2>
            <p>{maincontext.salon?.address}</p>
            <div className="mobilenumber">{maincontext.salon?.mobile} </div>
          </div>

          <div className="salonpage-right">
            <img
              className="salonPhoto"
              src={
                maincontext.salon?.salonPhoto ||
                process.env.REACT_APP_TEMPORARY_SALON_PIC
              }
              alt=""
            ></img>
          </div>
        </div>

        <div className="salonpage-bottom">
          <small>website:</small>
          <p style={{ marginLeft: "2rem", fontSize: "1.5rem" }}>
            {maincontext.salon?.website}
          </p>
        </div>
      </div>
    </>
  );
}

export default SalonpageOne;
