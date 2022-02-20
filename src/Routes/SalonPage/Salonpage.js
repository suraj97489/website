import React, { useContext, useEffect } from "react";
import Salonpagetwo from "./Salonpagetwo/Salonpagetwo";

import SalonpageOne from "../../components/CommonComponent/SalonpageOne";

import CircularProgress from "@mui/material/CircularProgress";

import ProviderContext from "./../../context/ProviderContext";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckStatus } from "../../features/mainSlice";
import { updateSalonProvidersfordisplay } from "../../features/salonSlice";
import { updateServices } from "../../features/providerSlice";

function Salonpage() {
  const salon = useSelector((state) => state.salon.salon);
  const overAllCustomers = useSelector((state) => state.main.overAllCustomers);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);
  const customer = useSelector((state) => state.userstate.customer);
  const dispatch = useDispatch();
  const providercontext = useContext(ProviderContext);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;

    overAllCustomers?.map((cust) => {
      if (cust.email === customer?.email) {
        dispatch(updateCheckStatus(cust.checkStatus));
      }
    });
    return () => {
      cancel = true;
    };
  }, [overAllCustomers, salon]);

  useEffect(() => {
    let cancel = false;

    function func() {
      if (cancel) return;
      // providercontext.setServices(salon.services);
      dispatch(updateServices(salon.services));
      let arr = serviceproviders?.map((provider) => {
        return { ...provider, display: "none" };
      });
      dispatch(updateSalonProvidersfordisplay(arr));
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

  if (customer) {
    return (
      <>
        <Helmet>
          <title>Salonpage</title>
          <meta
            name="description"
            content=" if booking is available,you can book your apointment ,edit selected services and cancel your booking."
          />
          <link rel="canonical" href="/salonpage" />
        </Helmet>
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
