import React, { useContext, useState } from "react";
import "./EditProfile.css";
import SalonInfo from "./SalonInfo/SalonInfo";
import ProviderInfo from "./ProviderInfo/ProviderInfo";
import ServicesSection from "./ServicesSection/ServicesSection";

import CircularProgress from "@mui/material/CircularProgress";

import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

function EditProfile() {
  document.title = "Edit Profile";
  const customer = useSelector((state) => state.userstate.customer);
  const salonUsername = useSelector(
    (state) => state.providerstate.salonUsername
  );
  const [buttonText, setButtonText] = useState("Salon Info");

  function buttonsClick(e) {
    let buttons = document.getElementsByClassName("EditProfile__topButtons");

    Array.from(buttons).forEach((button) =>
      button.classList.remove("activeStyle")
    );
    e.target.classList.add("activeStyle");

    setButtonText(e.target.textContent);
  }

  if (salonUsername === customer?.email) {
    return (
      <>
        <div className="EditProfile__container">
          <Helmet>
            <title>Edit Profile</title>
            <meta
              name="description"
              content="you can edit salon information and you can add,edit,delete services/provider."
            />
            <link rel="canonical" href="/edit-profile" />
          </Helmet>
          <div className="EditProfile__title__div">
            <button className="EditProfile__topButtons" onClick={buttonsClick}>
              Provider Info
            </button>
            <button
              className="EditProfile__topButtons activeStyle"
              onClick={buttonsClick}
            >
              Salon Info
            </button>
            <button className="EditProfile__topButtons" onClick={buttonsClick}>
              Services
            </button>
          </div>
          {buttonText === "Salon Info" && <SalonInfo />}
          {buttonText === "Provider Info" && <ProviderInfo />}
          {buttonText === "Services" && <ServicesSection />}
        </div>
        <div
          style={{
            height: "3rem",
            width: "100%",
            backgroundColor: "var(--secondary)",
          }}
        ></div>
      </>
    );
  } else {
    return (
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
    );
  }
}

export default EditProfile;
