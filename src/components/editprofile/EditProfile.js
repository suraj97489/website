import React, { useContext, useEffect, useState } from "react";
import "./EditProfile.css";
import SalonInfo from "./SalonInfo/SalonInfo";
import ProviderInfo from "./ProviderInfo/ProviderInfo";
import ServicesSection from "./ServicesSection/ServicesSection";
import Maincontext from "../../context/MainContext";
import UserContext from "../../context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Redirect } from "react-router-dom";
import ProviderContext from "./../../context/ProviderContext";

function EditProfile() {
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);
  const providerContext = useContext(ProviderContext);
  const [buttonText, setButtonText] = useState("Salon Info");

  function buttonsClick(e) {
    let buttons = document.getElementsByClassName("EditProfile__topButtons");

    Array.from(buttons).forEach((button) =>
      button.classList.remove("activeStyle")
    );
    e.target.classList.add("activeStyle");

    setButtonText(e.target.textContent);
  }

  if (providerContext.salonUsername === usercontext.customer?.email) {
    return (
      <>
        <div className="EditProfile__container">
          {/* <button className="EditProfile__change__photo"> change photo</button> */}
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
