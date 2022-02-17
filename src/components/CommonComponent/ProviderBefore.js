import React, { useContext } from "react";
import "./ProviderBefore.css";

import ProviderContext from "./../../context/ProviderContext";

import { Switch } from "@mui/material";
import { updateSalonProvidersfordisplay } from "../../features/salonSlice";
import { updateUserBooked } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
const label = { inputProps: { "aria-label": "Switch demo" } };

function ProviderBefore(props) {
  const providercontext = useContext(ProviderContext);

  const salonProvidersfordisplay = useSelector(
    (state) => state.salon.salonProvidersfordisplay
  );
  const customer = useSelector((state) => state.userstate.customer);
  const overAllCustomers = useSelector((state) => state.main.overAllCustomers);
  const dispatch = useDispatch();

  function providerdropdown(e, id) {
    let array = salonProvidersfordisplay.map((each) => {
      if (each.id === id) {
        if (each.display === "none") {
          return { ...each, display: "flex" };
        } else {
          return { ...each, display: "none" };
        }
      } else {
        return { ...each, display: "none" };
      }
    });
    dispatch(updateSalonProvidersfordisplay(array));
    let booleanValue = overAllCustomers.some((cust) => {
      return cust.email === customer?.email;
    });
    dispatch(updateUserBooked(booleanValue));

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
