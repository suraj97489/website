import React, { useContext } from "react";
import Maincontext from "../../context/MainContext";
import "./SalonDetails.css";
import { Redirect } from "react-router-dom";

import SalonInformation from "./Salon Information/SalonInformation";
import SalonStatistics from "./Salon Statistics/SalonStatistics";
import ServiceProviders from "./Service Providers/ServiceProviders";
import LoginCredentials from "./Login Credentials/LoginCredentials";
import UserContext from "../../context/UserContext";
import { Helmet } from "react-helmet-async";

function SalonDetails() {
  const { salon } = useContext(Maincontext);
  const usercontext = useContext(UserContext);

  if (usercontext.customer?.email === process.env.REACT_APP_ADMIN_USERNAME) {
    return (
      <div className="SalonDetails">
        <Helmet>
          <title>Salon Details</title>
          <meta
            name="description"
            content="you can check all detais about perticular salon."
          />
          <link rel="canonical" href="/salon-details" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="SalonDetails__TopDiv">
          <img
            className="SalonDetails_i_salonImg"
            src={salon?.salonPhoto || process.env.REACT_APP_TEMPORARY_SALON_PIC}
            alt="salon pic"
          ></img>
          <div className="SalonDetails_NameAndAddressDiv">
            <h3>{salon?.salonName} </h3>
            <p>{salon?.address}</p>
          </div>
        </div>
        <div className="SalonDetails__BottomDiv">
          <SalonInformation />
          <SalonStatistics />
          <ServiceProviders />
          <LoginCredentials />
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default SalonDetails;
