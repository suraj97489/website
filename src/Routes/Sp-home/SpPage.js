import React from "react";

import SpServiceproviderslist from "./SpServiceproviderslist";
import SpModal from "./SpModal";
import CircularProgress from "@mui/material/CircularProgress";

import SalonpageOne from "./../../components/CommonComponent/SalonpageOne";
import SalonpagetwoBodyTop from "./../SalonPage/Salonpagetwo/SalonpagetwoBodyTop/SalonpagetwoBodyTop";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

function SpPage() {
  const salon = useSelector((state) => state.salon.salon);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);

  const customer = useSelector((state) => state.userstate.customer);

  if (salon.salonUsername === customer?.email) {
    return (
      <>
        <Helmet>
          <title>Salonkatta-my salon</title>
          <meta
            name="description"
            content="you can add customers,edit their services,delete any customer,sort customers and you can shop open/close "
          />
          <link rel="canonical" href="/sp-home" />
        </Helmet>
        <SalonpageOne />
        <SalonpagetwoBodyTop provider={true} />

        <div className="salonpagetwo-body-bottom">
          {serviceproviders?.map((provider, i) => {
            return (
              <div key={provider.id}>
                <SpServiceproviderslist
                  providerPhoto={provider.providerPhoto}
                  fname={provider.fname}
                  lname={provider.lname}
                  id={provider.id}
                  bookingOn={provider.bookingOn}
                  list={provider.customers}
                  index={i}
                />
                <SpModal key={i} id={provider.id} />
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}

export default SpPage;
