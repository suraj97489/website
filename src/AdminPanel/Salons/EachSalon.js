import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useDispatch } from "react-redux";
import { updateSalon } from "../../features/salonSlice";

function EachSalon(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  function navigateToSalonDetails() {
    localStorage.setItem("salon", props.salon.salonCode);
    dispatch(updateSalon(props.salon));

    history.push("/salon-details");
  }

  return (
    <>
      <div className="Salons_SalonDiv" onClick={navigateToSalonDetails}>
        <img
          className="Salons_salonImg"
          src={props.salon?.salonPhoto}
          alt="salon pic"
        ></img>
        <p className="Salons_salonName">{props.salon.salonName}</p>
        <p className="Salons_district">kolhapur</p>
      </div>
    </>
  );
}

export default EachSalon;
