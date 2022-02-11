import { useEffect, useState } from "react";
import { db } from "../firebaseproduction";
import { collection, onSnapshot } from "@firebase/firestore";
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

  useEffect(() => {
    dataAfterRefresh();
    return () => {
      dataAfterRefresh();
    };
  }, []);

  function dataAfterRefresh() {
    onSnapshot(collection(db, "salon"), (snapshot) => {
      // ==================================update all salon====================================
      setAllSalon(
        snapshot.docs.map((doc) => {
          return {
            salonUsername: doc.data().salonUsername,
            salonCode: doc.data().salonCode,
          };
        })
      );

      //======================================Active list=======================================

      let arr = snapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        // allSalon
        .map((salon) => {
          // let trying;

          let saloncustomers = salon.serviceproviders.map((provider) => {
            if (provider.customers.length > 0) {
              return provider.customers;
            }
          });
          return saloncustomers;
        });

      let flatarray = arr.flat(3).filter((elem) => elem !== undefined);

      setOverAllCustomers(flatarray);
      //  ======================updating salon from local storage===================================

      let localSalon = localStorage.getItem("salon");

      if (localSalon && localSalon !== "temporarySalonCode") {
        let foundsalon = snapshot.docs
          .filter((doc) => {
            return doc.data().salonCode === localSalon;
          })
          .map((onedoc) => {
            return { ...onedoc.data(), id: onedoc.id };
          })[0];

        setSalon(foundsalon);
      } else {
        localSalon = localStorage.setItem("salon", "temporarySalonCode");
      }
    });

    // ======================updating grahak from local storage====================================
    updateGrahkfromlocalstorage();
    OnlyFourSalonHistoryLength();
  }
  function OnlyFourSalonHistoryLength() {
    let salonHistory = JSON.parse(localStorage.getItem("salonHistory"));
    if (salonHistory && salonHistory.length > 4) {
      let updatedSalonHistory = salonHistory.filter((each, i) => i < 4);
      localStorage.setItem("salonHistory", JSON.stringify(updatedSalonHistory));
    }
  }

  function updateGrahkfromlocalstorage() {
    let grahakavailable = localStorage.getItem("grahak");
    if (grahakavailable) {
      setGrahak(JSON.parse(grahakavailable));
    } else {
      grahakavailable = localStorage.setItem(
        "grahak",
        JSON.stringify({
          fname: " ",
          lname: " ",
          mobile: "",
          service: [],
          email: " ",
        })
      );
      setGrahak({
        fname: " ",
        lname: " ",
        mobile: "",
        service: [],
        email: " ",
      });
    }
  }

  useEffect(() => {
    function updatesetServiceProviders() {
      if (salon) {
        setServiceProviders(salon.serviceproviders);
        setShopOpen(() => {
          return salon.shopOpen;
        });
      }
    }

    updatesetServiceProviders();

    return () => {
      updatesetServiceProviders();
    };
  }, [salon]);

  const salonCodeValue = (e) => {
    let removedSpaces = e.target.value.replace(/ /g, "");
    setSalonCode(removedSpaces);
  };

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
        salonCodeValue,
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
