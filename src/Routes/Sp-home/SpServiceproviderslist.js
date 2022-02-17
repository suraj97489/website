import React, { useContext, useEffect } from "react";

import SpCustnames from "./SpCustnames";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebaseproduction";

import ProviderContext from "./../../context/ProviderContext";

import ProviderBefore from "./../../components/CommonComponent/ProviderBefore";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSalon,
  updateSalonProvidersfordisplay,
} from "../../features/salonSlice";

function SpServiceproviderslist(props) {
  const salon = useSelector((state) => state.salon.salon);
  const shopOpen = useSelector((state) => state.main.shopOpen);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);
  const salonProvidersfordisplay = useSelector(
    (state) => state.salon.salonProvidersfordisplay
  );
  const dispatch = useDispatch();

  const providercontext = useContext(ProviderContext);

  useEffect(() => {
    let cancel = false;
    function dataAfterRefreshAndsetSp() {
      if (cancel) return;
      let arr = serviceproviders?.map((provider) => {
        return { ...provider, display: "none" };
      });
      dispatch(updateSalonProvidersfordisplay(arr));
    }
    dataAfterRefreshAndsetSp();
    return () => {
      cancel = true;
    };
  }, []);

  function handleDragEnd(e, providerId) {
    if (!e.destination) return;

    let newprovidersarray = serviceproviders.map((provider) => {
      if (provider.id === providerId) {
        let thatCust = provider.customers.find(
          (cust, i) => i === e.source.index
        );
        let removedcustomerArray = provider.customers.filter(
          (cust, i) => i !== e.source.index
        );
        removedcustomerArray.splice(e.destination.index, 0, thatCust);

        // const [removed] = provider.customers.splice(e.source.index, 1);
        // provider.customers.splice(e.destination.index, 0, removed);
        return { ...provider, customers: removedcustomerArray };
      } else {
        return provider;
      }
    });
    dispatch(
      updateSalon({
        ...salon,
        serviceproviders: newprovidersarray,
      })
    );
    const docRef = doc(db, "salon", salon.id);
    const payLoad = {
      ...salon,
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

          {shopOpen && (
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
