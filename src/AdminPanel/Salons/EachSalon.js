import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Maincontext from "../../context/MainContext";

function EachSalon(props) {
  const maincontext = useContext(Maincontext);
  const history = useHistory();

  function navigateToSalonDetails() {
    localStorage.setItem("salon", props.salon.salonCode);
    maincontext.setSalon(props.salon);
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
