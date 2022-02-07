import React, { useContext, useEffect } from "react";
import Salonpagetwo from "./Salonpagetwo/Salonpagetwo";

import SalonpageOne from "../../components/CommonComponent/SalonpageOne";

import CircularProgress from "@mui/material/CircularProgress";
import UserContext from "./../../context/UserContext";
import Maincontext from "./../../context/MainContext";
import ProviderContext from "./../../context/ProviderContext";
import { useHistory } from "react-router";

function Salonpage() {
  const histry = useHistory();
  const usercontext = useContext(UserContext);
  const maincontext = useContext(Maincontext);
  const providercontext = useContext(ProviderContext);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    maincontext.overAllCustomers?.map((cust) => {
      if (cust.email === usercontext.customer?.email) {
        maincontext.setCheckStatus(cust.checkStatus);
      }
    });
    return () => {
      cancel = true;
    };
  }, [maincontext.overAllCustomers, maincontext.salon]);

  useEffect(() => {
    let cancel = false;

    function func() {
      if (cancel) return;
      providercontext.setServices(maincontext.salon.services);
      usercontext.updateSalonProvidersforDisplay();
    }

    func();
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;

    providercontext.firstPopUpHandler();
    providercontext.secondPopUpHandler();

    return () => {
      cancel = true;
      providercontext.firstPopUpHandler();
      providercontext.secondPopUpHandler();
    };
  }, []);

  if (usercontext.customer) {
    return (
      <>
        <SalonpageOne />
        <Salonpagetwo />
      </>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
}

export default Salonpage;
