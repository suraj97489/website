import React, { useContext, useEffect } from "react";

import SpCustnames from "./SpCustnames";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebaseproduction";
import Maincontext from "./../../context/MainContext";
import ProviderContext from "./../../context/ProviderContext";
import UserContext from "./../../context/UserContext";
import ProviderBefore from "./../../components/CommonComponent/ProviderBefore";

function SpServiceproviderslist(props) {
  const usercontext = useContext(UserContext);
  const maincontext = useContext(Maincontext);
  const providercontext = useContext(ProviderContext);

  useEffect(() => {
    let cancel = false;
    function dataAfterRefreshAndsetSp() {
      if (cancel) return;

      usercontext.updateSalonProvidersforDisplay();
    }
    dataAfterRefreshAndsetSp();
    return () => {
      cancel = true;
    };
  }, []);

  function handleDragEnd(e, providerId) {
    if (!e.destination) return;

    let newprovidersarray = maincontext.serviceproviders.map((provider) => {
      if (provider.id === providerId) {
        const [removed] = provider.customers.splice(e.source.index, 1);
        provider.customers.splice(e.destination.index, 0, removed);
        return provider;
      } else {
        return provider;
      }
    });
    maincontext.setSalon({
      ...maincontext.salon,
      serviceproviders: newprovidersarray,
    });
    const docRef = doc(db, "salon", maincontext.salon.id);
    const payLoad = {
      ...maincontext.salon,
      serviceproviders: newprovidersarray,
    };

    setDoc(docRef, payLoad);
  }

  return (
    <>
      <div className="providerall">
        <ProviderBefore
          id={props.id}
          fname={props.fname}
          lname={props.lname}
          providerPhoto={props.providerPhoto}
          provider={true}
          bookingOn={props.bookingOn}
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
          }
          className="provider-after"
        >
          <DragDropContext onDragEnd={(e) => handleDragEnd(e, props.id)}>
            <Droppable droppableId="droppableDiv">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ width: "100%" }}
                >
                  {props.list.map((cust, i) => {
                    return (
                      <SpCustnames
                        custName={cust.name}
                        key={`${cust.name}${i}`}
                        id={cust.mobile}
                        service={cust.service}
                        cust={cust}
                        // display={cust.display}
                        display={"none"}
                        list={props.list}
                        refer={props.id}
                        mobile={cust.mobile}
                        email={cust.email}
                        index={i}
                        providerName={props.fname + " " + props.lname}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {maincontext.shopOpen && (
            <button
              id={props.id + props.fname + props.lname}
              onClick={() => providercontext.handleOpen(props.id)}
              className="bookyourname"
            >
              ADD CUSTOMER
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SpServiceproviderslist;
