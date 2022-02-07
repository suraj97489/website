import React, { useContext, useEffect } from "react";
import "./Serviceproviderslist.css";
import Maincontext from "./../../../../../context/MainContext";
import ProviderContext from "./../../../../../context/ProviderContext";
import UserContext from "./../../../../../context/UserContext";
import ProviderBefore from "./../../../../../components/CommonComponent/ProviderBefore";
import Custnames from "./Custnames/Custnames";

function Serviceproviderslist(props) {
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);
  const providercontext = useContext(ProviderContext);

  function bookname(event, providerId) {
    maincontext.setIsOpen(true);
    maincontext.setIdOfProvider(providerId);
    providercontext.setAddingcustomer(true);
    maincontext.grahak.service = [];
    maincontext.grahak.mobile = "";
  }

  useEffect(() => {
    usercontext.updateUserBookingStatus();
    return () => {
      usercontext.updateUserBookingStatus();
    };
  }, [maincontext.salon]);

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
            usercontext.salonProvidersfordisplay?.length > 0
              ? {
                  display: usercontext.salonProvidersfordisplay[props.index]
                    ? usercontext.salonProvidersfordisplay[props.index].display
                    : "none",
                }
              : { display: "none" }
            // { display: maincontext.listnamesDisplay }
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

          {!usercontext.userBooked && props.bookingOn && (
            <button
              onClick={(event) => {
                bookname(event, props.id);
              }}
              className="bookyourname"
            >
              BOOK YOUR NAME
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Serviceproviderslist;
