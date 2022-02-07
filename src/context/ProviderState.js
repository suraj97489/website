import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebaseproduction";
import React, { useContext, useEffect, useState } from "react";
import Maincontext from "./MainContext";
import ProviderContext from "./ProviderContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ProviderState(props) {
  const maincontext = useContext(Maincontext);

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
      setServices(maincontext.salon?.services);
      setSalonUsername(maincontext.salon?.salonUsername);
    }
    updateService();
    return () => {
      cancel = true;
    };
  }, [maincontext.salon]);

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

  const handleOpen = (providerId) => {
    setSelectedServices([]);
    setAddingcustomer(true);
    setOpen(true);
    setProviderId(providerId);
  };

  function spCollectcheckvalue(e) {
    if (e.target.checked) {
      setSelectedServices(() => [...selectedServices, e.target.value]);
    } else {
      setSelectedServices(() => {
        return selectedServices.filter((service) => {
          return service !== e.target.value;
        });
      });
    }
  }

  function bookingControl(e, providerId) {
    e.stopPropagation();
    let newprovidersarray = maincontext.serviceproviders.map((provider) => {
      if (providerId === provider.id) {
        provider.bookingOn = e.target.checked;
        return provider;
      } else {
        return provider;
      }
    });
    const docRef = doc(db, "salon", maincontext.salon.id);
    const payLoad = {
      ...maincontext.salon,
      serviceproviders: newprovidersarray,
    };

    setDoc(docRef, payLoad);
  }

  function done(idOfProvider, e, cust, providerName) {
    e.stopPropagation();

    let newprovidersarray = maincontext.serviceproviders.map((provider) => {
      if (provider.id === idOfProvider) {
        let time = new Date().getTime();
        provider.customers = provider.customers.filter((cust, i) => i !== 0);
        provider.checkingTime = time + 1000 * 150;
        provider.customerResponded = false;
        provider.popUpTime = time + 1000 * 60;

        return provider;
      } else {
        return provider;
      }
    });

    let date = new Date().toDateString();
    let time = new Date().toLocaleTimeString();
    let serviceWithCharges = cust.service.map((eachServiceName) => {
      return services.find((service) => service.name === eachServiceName);
    });

    let customerPaid = serviceWithCharges.reduce((accumulte, service) => {
      return accumulte + Number(service.charges);
    }, 0);

    let report = {
      custName: cust.name,
      custMobile: cust.mobile,
      providerName: providerName,
      date: date,
      time: time,
      services: serviceWithCharges,
      providerId: idOfProvider,
      customerPaid: customerPaid,
      addedBy: cust.addedBy,
    };

    let salonReportUpdatedArray = [report, ...maincontext.salon.salonReport];

    const docRef = doc(db, "salon", maincontext.salon.id);

    const payLoad = {
      ...maincontext.salon,
      serviceproviders: newprovidersarray,
      salonReport: salonReportUpdatedArray,
    };

    setDoc(docRef, payLoad);
  }

  async function firstPopUpHandler() {
    let currentTime = new Date().getTime();
    if (!maincontext.salon?.popUpActivated) {
      return;
    }

    if (
      maincontext.serviceproviders?.some(
        (provider) =>
          provider.customers.length >= 2 &&
          provider.popUpTime <= currentTime &&
          provider.customers[1].addedBy === "customer" &&
          provider.customers[1].checkStatus === false &&
          provider.customerResponded === false
      )
    ) {
      let newprovidersarray = maincontext.serviceproviders?.map((provider) => {
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

      const docRef = doc(db, "salon", maincontext.salon.id);
      const payLoad = {
        ...maincontext.salon,
        serviceproviders: newprovidersarray,
      };
      setDoc(docRef, payLoad);
    }
  }

  function secondPopUpHandler() {
    let currentTime = new Date().getTime();
    if (!maincontext.salon?.popUpActivated) {
      return;
    }
    if (
      maincontext.serviceproviders?.some(
        (provider) =>
          provider.customers.length >= 3 &&
          provider.customers[2].checkStatus === false &&
          provider.checkingTime < currentTime &&
          provider.customers[1].addedBy === "customer" &&
          provider.customers[1].checkStatus === true &&
          provider.customerResponded === false
      )
    ) {
      let newprovidersarray = maincontext.serviceproviders.map((provider) => {
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

      const docRef = doc(db, "salon", maincontext.salon.id);
      const payLoad = {
        ...maincontext.salon,
        serviceproviders: newprovidersarray,
      };
      setDoc(docRef, payLoad);
    }
  }
  const closeAlert = (value) => {
    setAlertProvider(false);
  };
  return (
    <ProviderContext.Provider
      value={{
        sp,
        setSp,
        services,
        setServices,
        open,
        setOpen,
        handleOpen,
        custIndex,
        setCustIndex,
        spCollectcheckvalue,
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
        bookingControl,
        done,
        firstPopUpHandler,
        secondPopUpHandler,
        salonUsername,
        buttonDisabled,
        setButtonDisabled,
        alertProvider,
        setAlertProvider,
        alertMessage,
        setAlertMessage,
        closeAlert,
        photoUploadingProgress,
        setPhotoUploadingProgress,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
}

export default ProviderState;
