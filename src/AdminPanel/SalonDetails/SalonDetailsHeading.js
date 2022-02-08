import React, { useContext } from "react";

import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Maincontext from "../../context/MainContext";

function SalonDetailsHeading(props) {
  const maincontext = useContext(Maincontext);
  function dropDownDetails() {
    if (props.heading === "SALON INFORMATION") {
      if (maincontext.detailsHeading !== "SALON INFORMATION") {
        maincontext.setDetailsHeading("SALON INFORMATION");
      } else {
        maincontext.setDetailsHeading();
      }
    } else if (props.heading === "Login CREDENTIAL") {
      if (maincontext.detailsHeading !== "Login CREDENTIAL") {
        maincontext.setDetailsHeading("Login CREDENTIAL");
      } else {
        maincontext.setDetailsHeading();
      }
    } else if (props.heading === "SALON STATISTICS") {
      if (maincontext.detailsHeading !== "SALON STATISTICS") {
        maincontext.setDetailsHeading("SALON STATISTICS");
      } else {
        maincontext.setDetailsHeading();
      }
    } else if (props.heading === "SERVICE PROVIDERS") {
      if (maincontext.detailsHeading !== "SERVICE PROVIDERS") {
        maincontext.setDetailsHeading("SERVICE PROVIDERS");
      } else {
        maincontext.setDetailsHeading();
      }
    }
  }

  return (
    <div className="SalonDetails__eachContainer" onClick={dropDownDetails}>
      <h4>{props.heading}</h4> <ArrowDropDown className="ArrowDropDown" />
    </div>
  );
}

export default SalonDetailsHeading;
