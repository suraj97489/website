import React, { useContext } from "react";
import ProviderInfo from "../../../components/editprofile/ProviderInfo/ProviderInfo";
import Maincontext from "../../../context/MainContext";
import SalonDetailsHeading from "../SalonDetailsHeading";

function ServiceProviders() {
  const maincontext = useContext(Maincontext);
  return (
    <>
      <SalonDetailsHeading heading="SERVICE PROVIDERS" />
      {maincontext.detailsHeading === "SERVICE PROVIDERS" && <ProviderInfo />}
    </>
  );
}

export default ServiceProviders;
