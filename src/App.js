import React from "react";
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

function App() {
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
