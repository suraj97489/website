import React, { useContext } from "react";
import SalonInfo from "../../../components/editprofile/SalonInfo/SalonInfo";
import SalonDetailsHeading from "../SalonDetailsHeading";

import { useSelector } from "react-redux";
function SalonInformation() {
  const detailsHeading = useSelector((state) => state.main.detailsHeading);
  return (
    <>
      <SalonDetailsHeading heading="SALON INFORMATION" />
      {detailsHeading === "SALON INFORMATION" && <SalonInfo />}
    </>
  );
}

export default SalonInformation;
