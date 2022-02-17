import React, { useContext, useEffect } from "react";
import "./Serviceproviderslist.css";

import ProviderContext from "./../../../../../context/ProviderContext";

import ProviderBefore from "./../../../../../components/CommonComponent/ProviderBefore";
import Custnames from "./Custnames/Custnames";
import { secondary } from "../../../../../theme/colors";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateGrahak,
  updateIdOfProvider,
  updateIsOpen,
} from "../../../../../features/mainSlice";
import { updateSalonProvidersfordisplay } from "../../../../../features/salonSlice";
import { updateUserBooked } from "../../../../../features/userSlice";

function Serviceproviderslist(props) {
  const dispatch = useDispatch();
  const salon = useSelector((state) => state.salon.salon);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);
  const grahak = useSelector((state) => state.main.grahak);
  const overAllCustomers = useSelector((state) => state.main.overAllCustomers);
  const customer = useSelector((state) => state.userstate.customer);
  const userBooked = useSelector((state) => state.userstate.userBooked);
  const salonProvidersfordisplay = useSelector(
    (state) => state.salon.salonProvidersfordisplay
  );

  const providercontext = useContext(ProviderContext);

  useEffect(() => {
    let arr = serviceproviders?.map((provider) => {
      return { ...provider, display: "none" };
    });
    dispatch(updateSalonProvidersfordisplay(arr));
  }, []);

  function bookname(event, providerId) {
    dispatch(updateIsOpen(true));
    dispatch(updateIdOfProvider(providerId));

    providercontext.setAddingcustomer(true);
    dispatch(updateGrahak({ ...grahak, service: [], mobile: "" }));
  }

  useEffect(() => {
    let boolean = overAllCustomers.some((cust) => {
      return cust.email === customer?.email;
    });
    dispatch(updateUserBooked(boolean));
  }, [salon]);

  return (
    <>
      <div className="providerall">
        <ProviderBefore
          bookingOn={props.bookingOn}
          provider={false}
          id={props.id}
          fname={props.fname}
          lname={props.lname}
          providerPhoto={props.providerPhoto}
          list={props.list}
        />

        <div
          style={
            salonProvidersfordisplay?.length > 0
              ? {
                  display: salonProvidersfordisplay[props.index]
                    ? salonProvidersfordisplay[props.index].display
                    : "none",
                }
              : { display: "none" }
          }
          className="provider-after"
        >
          {props.list.map((cust, i) => {
            return (
              <Custnames
                custName={cust.name}
                key={`${cust.name}${i}`}
                id={cust.mobile}
                service={cust.service}
                cust={cust}
                bookingOn={props.bookingOn}
                display={"none"}
                list={props.list}
                refer={props.id}
                mobile={cust.mobile}
                email={cust.email}
                index={i}
              />
            );
          })}

          {!userBooked && props.bookingOn && (
            <Button
              className="bookyourname"
              style={{
                backgroundColor: secondary,
                color: "black",
                width: "100%",
                fontSize: "2rem",
                borderRadius: 20,
                margin: 10,
                fontWeight: "bold",
              }}
              onClick={(event) => {
                bookname(event, props.id);
              }}
              variant="contained"
            >
              BOOK YOUR NAME
            </Button>
            // <button
            //   onClick={(event) => {
            //     bookname(event, props.id);
            //   }}
            //   className="bookyourname"
            // >
            //   BOOK YOUR NAME
            // </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Serviceproviderslist;
