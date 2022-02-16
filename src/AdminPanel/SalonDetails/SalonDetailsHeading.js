import React from "react";

import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import { useSelector, useDispatch } from "react-redux";
import { updateDetailsHeading } from "../../features/mainSlice";
function SalonDetailsHeading(props) {
  const dispatch = useDispatch();

  const detailsHeading = useSelector((state) => state.main.detailsHeading);

  function dropDownDetails() {
    if (props.heading === "SALON INFORMATION") {
      if (detailsHeading !== "SALON INFORMATION") {
        dispatch(updateDetailsHeading("SALON INFORMATION"));
      } else {
        dispatch(updateDetailsHeading(null));
      }
    } else if (props.heading === "Login CREDENTIAL") {
      if (detailsHeading !== "Login CREDENTIAL") {
        dispatch(updateDetailsHeading("Login CREDENTIAL"));
      } else {
        dispatch(updateDetailsHeading(null));
      }
    } else if (props.heading === "SALON STATISTICS") {
      if (detailsHeading !== "SALON STATISTICS") {
        dispatch(updateDetailsHeading("SALON STATISTICS"));
      } else {
        dispatch(updateDetailsHeading(null));
      }
    } else if (props.heading === "SERVICE PROVIDERS") {
      if (detailsHeading !== "SERVICE PROVIDERS") {
        dispatch(updateDetailsHeading("SERVICE PROVIDERS"));
      } else {
        dispatch(updateDetailsHeading(null));
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
