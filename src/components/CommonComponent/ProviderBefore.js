import React, { useContext } from "react";
import "./ProviderBefore.css";
import Maincontext from "./../../context/MainContext";
import ProviderContext from "./../../context/ProviderContext";
import UserContext from "./../../context/UserContext";
import { Switch } from "@mui/material";
const label = { inputProps: { "aria-label": "Switch demo" } };

function ProviderBefore(props) {
  const maincontext = useContext(Maincontext);
  const providercontext = useContext(ProviderContext);
  const usercontext = useContext(UserContext);

  function providerdropdown(e, id) {
    usercontext.setSalonProvidersfordisplay((old) => {
      if (old) {
        return old.map((each) => {
          if (each.id === id) {
            if (each.display === "none") {
              return { ...each, display: "flex" };
            } else {
              return { ...each, display: "none" };
            }
          } else {
            each.display = "none";
            return each;
          }
        });
      } else {
        maincontext.serviceproviders.map((each) => {
          if (each.id === id) {
            if (each.display === "none") {
              return { ...each, display: "flex" };
            } else {
              return { ...each, display: "none" };
            }
          } else {
            each.display = "none";
            return each;
          }
        });
      }
    });
    usercontext.updateUserBookingStatus();
    providercontext.firstPopUpHandler();
    providercontext.secondPopUpHandler();
  }

  return (
    <>
      <div
        onClick={(e) => providerdropdown(e, props.id)}
        className="provider-before"
      >
        <div className="provider-photo-holder">
          <img
            src={
              props.providerPhoto || process.env.REACT_APP_TEMPORARY_PROFILE_PIC
            }
            alt="provider pic"
            height="8.1rem"
            width="8.1rem"
            title="provider pic"
            loading="eager"
          ></img>
        </div>
        <div className="nameandbooking">
          <h2 className="provider-name">
            {props.fname} {props.lname}
          </h2>

          {props.provider ? (
            <Switch
              defaultChecked={props.bookingOn}
              size="small"
              {...label}
              onClick={(e) => {
                providercontext.bookingControl(e, props.id);
              }}
              {...label}
            />
          ) : props.bookingOn ? (
            <p className="booking-on">Booking On</p>
          ) : (
            <p className="booking-off">Booking Off</p>
          )}
        </div>
        <i className="fas fa-caret-down"></i>
      </div>
    </>
  );
}

export default ProviderBefore;
