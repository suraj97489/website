import React, { useEffect } from "react";
import CheckStatusModal from "../Routes/SalonPage/Modals/CheckStatus";
import EditProfile from "../components/editprofile/EditProfile";
import Header from "../components/Header/Header";

import Footer from "../components/Footer/Footer";
import Registration from "../Routes/Registration/Registration";
import Salonpage from "../Routes/SalonPage/Salonpage";
import About from "../Routes/about/About";
import Contactus from "../Routes/Contactus/Contactus";
import { Redirect } from "react-router";
import SalonReport from "../Routes/Report/SalonReport";
import HomePage from "../Routes/home/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GoogleSignin from "../Routes/GoogleSignIn/GoogleSignin";
import SpPage from "../Routes/Sp-home/SpPage";
import Notify from "../components/notify/Notify";
import ScrollToTop from "../components/ScrollToTop";
import Salons from "../AdminPanel/Salons/Salons";
import DashBoard from "../AdminPanel/DashBoard";
import AddSalon from "../AdminPanel/AddSalon/AddSalon";
import AdminLogin from "../AdminPanel/AdminLogin";
import SalonDetails from "../AdminPanel/SalonDetails/SalonDetails";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import { updateSalon, updateServiceproviders } from "../features/salonSlice";

import {
  updateAllSalon,
  updateOverAllCustomers,
  updateGrahak,
  updateShopOpen,
  // updateSalonCode,
  updateUser,
} from "../features/mainSlice";
import { updateCustomer } from "../features/userSlice";
import { updateServices } from "../features/providerSlice";

function AllRoutes() {
  const salon = useSelector((state) => state.salon.salon);
  const auth = getAuth();

  const allSalon = useSelector((state) => state.main.allSalon);
  const dispatch = useDispatch();

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

  // const salonCodeValue = (e) => {
  //   let removedSpaces = e.target.value.replace(/ /g, "");
  //   dispatch(updateSalonCode(removedSpaces));
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        let customerValue = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        };
        dispatch(updateCustomer(customerValue));
        // console.log(allSalon);
        let thisIsprovider = allSalon?.some((salon) => {
          return salon.salonUsername === user.email;
        });

        if (thisIsprovider) {
          // console.log("this is provider");
          dispatch(updateUser("provider"));
        } else if (user.email === process.env.REACT_APP_ADMIN_USERNAME) {
          // console.log("this is admin");
          dispatch(updateUser("admin"));
        } else {
          // console.log("this is customer");
          allSalon.length === 0
            ? dispatch(updateUser(null))
            : dispatch(updateUser("customer"));
        }
      } else {
        dispatch(updateUser(null));
        dispatch(updateCustomer(null));
      }
    });
    return unsubscribe;
  }, [salon]);

  return (
    <>
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
    </>
  );
}

export default AllRoutes;
