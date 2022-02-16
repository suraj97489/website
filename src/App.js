import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import "./css/index.css";
import Footer from "./components/Footer/Footer";
import Registration from "./Routes/Registration/Registration";
import Salonpage from "./Routes/SalonPage/Salonpage";
import About from "./Routes/about/About";
import Contactus from "./Routes/Contactus/Contactus";
import { Redirect } from "react-router";
import SalonReport from "./Routes/Report/SalonReport";
import HomePage from "./Routes/home/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainState from "./context/MainState";
import UserState from "./context/UserState";
import GoogleSignin from "./Routes/GoogleSignIn/GoogleSignin";

import ProviderState from "./context/ProviderState";
import CheckStatusModal from "./Routes/SalonPage/Modals/CheckStatus";
import EditProfile from "./components/editprofile/EditProfile";

import SpPage from "./Routes/Sp-home/SpPage";
import Notify from "./components/notify/Notify";
import ScrollToTop from "./components/ScrollToTop";
import Salons from "./AdminPanel/Salons/Salons";
import DashBoard from "./AdminPanel/DashBoard";
import AddSalon from "./AdminPanel/AddSalon/AddSalon";
import AdminLogin from "./AdminPanel/AdminLogin";
import SalonDetails from "./AdminPanel/SalonDetails/SalonDetails";

import { db } from "./firebaseproduction";
import { collection, onSnapshot } from "@firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { updateSalon, updateServiceproviders } from "./features/salonSlice";
import {
  updateAllSalon,
  updateOverAllCustomers,
  updateGrahak,
  updateShopOpen,
  updateSalonCode,
} from "./features/mainSlice";

function App() {
  const salon = useSelector((state) => state.salon.salon);

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

  useEffect(() => {
    function updatesetServiceProviders() {
      if (salon) {
        dispatch(updateServiceproviders(salon.serviceproviders));
        dispatch(updateShopOpen(salon.shopOpen));
      }
    }

    updatesetServiceProviders();

    return () => {
      updatesetServiceProviders();
    };
  }, [salon]);

  const salonCodeValue = (e) => {
    let removedSpaces = e.target.value.replace(/ /g, "");
    dispatch(updateSalonCode(removedSpaces));
  };
  return (
    <>
      <MainState>
        <ProviderState>
          <UserState>
            <Router>
              <ScrollToTop />
              <Header />
              <Notify />
              <CheckStatusModal />
              <Switch>
                <Route exact path="/all-salons">
                  <Salons />
                </Route>
                <Route exact path="/salon-details">
                  <SalonDetails />
                </Route>
                <Route exact path="/8484">
                  <AdminLogin />
                </Route>
                <Route exact path="/dashboard">
                  <DashBoard />
                </Route>
                <Route exact path="/add-salon">
                  <AddSalon />
                </Route>
                <Route exact path="/registration">
                  <Registration />
                </Route>

                <Route exact path="/edit-profile">
                  <EditProfile />
                </Route>

                <Route exact path="/salon-report">
                  <SalonReport />
                </Route>

                <Route exact path="/sp-home">
                  <SpPage />
                </Route>

                <Route exact path="/sign-in-with-google">
                  <GoogleSignin />
                </Route>

                <Route exact path="/">
                  <HomePage />
                </Route>

                <Route exact path="/salonpage">
                  <Salonpage />
                </Route>

                <Route exact path="/about">
                  <About />
                </Route>

                <Route exact path="/contactus">
                  <Contactus />
                </Route>

                <Redirect to="/" />
              </Switch>
              <Footer />
            </Router>
          </UserState>
        </ProviderState>
      </MainState>
    </>
  );
}

export default App;
