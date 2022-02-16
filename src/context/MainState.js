import { useState } from "react";

import Maincontext from "./MainContext";

function MainState(props) {
  const [serviceproviders, setServiceProviders] = useState([]);
  const [user, setUser] = useState("admin");
  const [milliSeconds, setMilliseconds] = useState();
  const [salon, setSalon] = useState({
    salonName: "Loading...",
    address: "",
    website: "",
    mobile: "",
    salonPhoto: "Loading....",
    salonCode: "",
    salonPassword: "",
    services: [],
    salonUsername: false,
  });

  const [salonCode, setSalonCode] = useState("");
  const [allSalon, setAllSalon] = useState([]);
  const [shopOpen, setShopOpen] = useState(true);

  const [checkStatus, setCheckStatus] = useState(false);
  const [custResponce, setCustResponce] = useState();

  const [drawerInnerText, setDrawerInnerText] = useState("Dashboard");
  const [grahak, setGrahak] = useState({
    fname: "",
    lname: "",
    mobile: "",
    service: [],
    email: "",
  });

  const [idOfProvider, setIdOfProvider] = useState(" ");
  const [isOpen, setIsOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [overAllCustomers, setOverAllCustomers] = useState([]);
  const [notify, setNotify] = useState({
    message: "",
    style: {
      backgroundColor: "green",
      color: "white",
    },
  });

  const [detailsHeading, setDetailsHeading] = useState();

  return (
    <Maincontext.Provider
      value={{
        serviceproviders,
        setServiceProviders,
        isOpen,
        setIsOpen,
        user,
        setUser,
        grahak,
        setGrahak,
        idOfProvider,
        salonCode,
        setSalonCode,

        allSalon,
        salon,
        setSalon,
        setIdOfProvider,

        shopOpen,
        setShopOpen,
        openDrawer,
        setOpenDrawer,
        overAllCustomers,
        setOverAllCustomers,
        checkStatus,
        setCheckStatus,
        custResponce,
        setCustResponce,
        milliSeconds,
        setMilliseconds,

        drawerInnerText,
        setDrawerInnerText,
        notify,
        setNotify,
        detailsHeading,
        setDetailsHeading,
      }}
    >
      {props.children}
    </Maincontext.Provider>
  );
}

export default MainState;
