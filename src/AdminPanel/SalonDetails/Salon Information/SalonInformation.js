import React, { useContext } from "react";
import SalonInfo from "../../../components/editprofile/SalonInfo/SalonInfo";
import SalonDetailsHeading from "../SalonDetailsHeading";
import MainContext from "./../../../context/MainContext";

function SalonInformation() {
  const maincontext = useContext(MainContext);

  return (
    <>
      <SalonDetailsHeading heading="SALON INFORMATION" />
      {maincontext.detailsHeading === "SALON INFORMATION" && <SalonInfo />}
    </>
  );
}

export default SalonInformation;
