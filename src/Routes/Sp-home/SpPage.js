import React, { useContext } from "react";

import SpServiceproviderslist from "./SpServiceproviderslist";
import SpModal from "./SpModal";
import CircularProgress from "@mui/material/CircularProgress";
import Maincontext from "./../../context/MainContext";

import UserContext from "./../../context/UserContext";
import SalonpageOne from "./../../components/CommonComponent/SalonpageOne";
import SalonpagetwoBodyTop from "./../SalonPage/Salonpagetwo/SalonpagetwoBodyTop/SalonpagetwoBodyTop";

function SpPage() {
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);

  if (maincontext.salon.salonUsername === usercontext.customer?.email) {
    return (
      <>
        <SalonpageOne />
        <SalonpagetwoBodyTop provider={true} />

        <div className="salonpagetwo-body-bottom">
          {maincontext.serviceproviders?.map((provider, i) => {
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
