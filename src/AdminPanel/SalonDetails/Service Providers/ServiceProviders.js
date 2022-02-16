import React from "react";
import ProviderInfo from "../../../components/editprofile/ProviderInfo/ProviderInfo";

import SalonDetailsHeading from "../SalonDetailsHeading";
import { useSelector } from "react-redux";
function ServiceProviders() {
  const detailsHeading = useSelector((state) => state.main.detailsHeading);
  return (
    <>
      <SalonDetailsHeading heading="SERVICE PROVIDERS" />
      {detailsHeading === "SERVICE PROVIDERS" && <ProviderInfo />}
    </>
  );
}

export default ServiceProviders;
