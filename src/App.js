import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProviderState from "./context/ProviderState";
import "./css/index.css";
import AllRoutes from "./Routes/AllRoutes";
import { db } from "./firebaseproduction";
import { collection, onSnapshot } from "@firebase/firestore";
import {
  updateAllSalon,
  updateGrahak,
  updateOverAllCustomers,
} from "./features/mainSlice";
import { updateSalon } from "./features/salonSlice";
import { updateServices } from "./features/providerSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dataAfterRefresh();
    return () => {
      dataAfterRefresh();
    };
  }, []);

  function dataAfterRefresh() {
    onSnapshot(collection(db, "salon"), (snapshot) => {
      // ==================================update all salon====================================
      let allSalonValue = snapshot.docs.map((doc) => {
        return {
          salonUsername: doc.data().salonUsername,
          salonCode: doc.data().salonCode,
        };
      });
      dispatch(updateAllSalon(allSalonValue));
      console.log(allSalonValue);

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
      dispatch(updateOverAllCustomers(flatarray));

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

        dispatch(updateSalon(foundsalon));
        dispatch(updateServices(foundsalon.services));
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
      let grahakValue = JSON.parse(grahakavailable);
      dispatch(updateGrahak(grahakValue));
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
      let grahakValue = {
        fname: " ",
        lname: " ",
        mobile: "",
        service: [],
        email: " ",
      };
      dispatch(updateGrahak(grahakValue));
    }
  }
  return (
    <>
      <ProviderState>
        <AllRoutes />
      </ProviderState>
    </>
  );
}

export default App;
