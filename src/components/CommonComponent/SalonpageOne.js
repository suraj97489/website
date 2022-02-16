import React from "react";
import "./SalonpageOne.css";

import { useSelector } from "react-redux";

function SalonpageOne() {
  const salon = useSelector((state) => state.salon.salon);

  return (
    <>
      <div className="salonpage-container">
        <div className="salonpage-inner">
          <div className="salonpage-left">
            <h2>{salon?.salonName}</h2>
            <p>{salon?.address}</p>
            <div className="mobilenumber">{salon?.mobile} </div>
          </div>

          <div className="salonpage-right">
            <img
              className="salonPhoto"
              src={
                salon?.salonPhoto || process.env.REACT_APP_TEMPORARY_SALON_PIC
              }
              height="20rem"
              width="20rem"
              alt="salon_photo"
              title="salon photo"
              loading="eager"
            ></img>
          </div>
        </div>

        <div className="salonpage-bottom">
          <small>website:</small>
          <p style={{ marginLeft: "2rem", fontSize: "1.5rem" }}>
            {salon?.website}
          </p>
        </div>
      </div>
    </>
  );
}

export default SalonpageOne;
