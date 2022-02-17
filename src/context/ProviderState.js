import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebaseproduction";
import React, { useEffect, useState } from "react";

import ProviderContext from "./ProviderContext";
import { useSelector } from "react-redux";

function ProviderState(props) {
  const salon = useSelector((state) => state.salon.salon);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);

  const [sp, setSp] = useState({ salonUsername: "", salonPassword: "" });
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [addingcustomer, setAddingcustomer] = useState(true);
  const [providerId, setProviderId] = useState();

  const [services, setServices] = useState([{ name: "", charges: "" }]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [custIndex, setCustIndex] = useState();
  const [salonUsername, setSalonUsername] = useState("username");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [alertProvider, setAlertProvider] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [photoUploadingProgress, setPhotoUploadingProgress] = useState(0);

  useEffect(() => {
    let cancel = false;
    function updateService() {
      if (cancel) return;
      setServices(salon?.services);
      setSalonUsername(salon?.salonUsername);
    }
    updateService();
    return () => {
      cancel = true;
    };
  }, [salon]);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    if (photoUploadingProgress === 100) {
      setTimeout(() => {
        setPhotoUploadingProgress(0);
      }, 3000);
    }
    return () => {
      cancel = true;
    };
  }, [photoUploadingProgress]);

  // const handleOpen = (providerId) => {
  //   setSelectedServices([]);
  //   setAddingcustomer(true);
  //   setOpen(true);
  //   setProviderId(providerId);
  // };

  async function firstPopUpHandler() {
    let currentTime = new Date().getTime();
    if (!salon?.popUpActivated) {
      return;
    }

    if (
      serviceproviders?.some(
        (provider) =>
          provider.customers.length >= 2 &&
          provider.popUpTime <= currentTime &&
          provider.customers[1].addedBy === "customer" &&
          provider.customers[1].checkStatus === false &&
          provider.customerResponded === false
      )
    ) {
      let newprovidersarray = serviceproviders?.map((provider) => {
        if (
          provider.customers.length >= 2 &&
          provider.popUpTime < currentTime &&
          provider.customers[1].addedBy === "customer" &&
          provider.customers[1].checkStatus === false &&
          provider.customerResponded === false
        ) {
          provider.customers.forEach((cust, i) => {
            if (i === 1) {
              cust.checkStatus = true;
              return cust;
            } else {
              cust.checkStatus = false;
              return cust;
            }
          });

          return provider;
        } else {
          return provider;
        }
      });

      const docRef = doc(db, "salon", salon.id);
      const payLoad = {
        ...salon,
        serviceproviders: newprovidersarray,
      };
      setDoc(docRef, payLoad);
    }
  }

  function secondPopUpHandler() {
    let currentTime = new Date().getTime();
    if (!salon?.popUpActivated) {
      return;
    }
    if (
      serviceproviders?.some(
        (provider) =>
          provider.customers.length >= 3 &&
          provider.customers[2].checkStatus === false &&
          provider.checkingTime < currentTime &&
          provider.customers[1].addedBy === "customer" &&
          provider.customers[1].checkStatus === true &&
          provider.customerResponded === false
      )
    ) {
      let newprovidersarray = serviceproviders.map((provider) => {
        if (
          provider.customers.length >= 3 &&
          provider.customers[2].checkStatus === false &&
          provider.checkingTime < currentTime &&
          provider.customers[1].addedBy === "customer" &&
          provider.customers[1].checkStatus === true &&
          provider.customerResponded === false
        ) {
          provider.customers.forEach((cust, i) => {
            if (i !== 0) {
              cust.checkStatus = true;
              return cust;
            } else {
              return cust;
            }
          });

          return provider;
        } else {
          return provider;
        }
      });

      const docRef = doc(db, "salon", salon.id);
      const payLoad = {
        ...salon,
        serviceproviders: newprovidersarray,
      };
      setDoc(docRef, payLoad);
    }
  }

  return (
    <ProviderContext.Provider
      value={{
        sp,
        setSp,
        services,
        setServices,
        open,
        setOpen,
        // handleOpen,
        custIndex,
        setCustIndex,

        selectedServices,
        setSelectedServices,
        customerName,
        setCustomerName,
        customerMobile,
        setCustomerMobile,
        providerId,
        setProviderId,
        addingcustomer,
        setAddingcustomer,

        firstPopUpHandler,
        secondPopUpHandler,
        salonUsername,
        buttonDisabled,
        setButtonDisabled,
        alertProvider,
        setAlertProvider,
        alertMessage,
        setAlertMessage,

        photoUploadingProgress,
        setPhotoUploadingProgress,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
}

export default ProviderState;
