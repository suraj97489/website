import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./SpCustnames.css";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { doc, runTransaction, setDoc } from "@firebase/firestore";
import { db } from "../../firebaseproduction";

import ProviderContext from "./../../context/ProviderContext";
import { updateSalon } from "./../../features/salonSlice";

import CallIcon from "@material-ui/icons/Call";
import { useSelector, useDispatch } from "react-redux";

function SpCustnames(props) {
  const salon = useSelector((state) => state.salon.salon);
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);
  const dispatch = useDispatch();
  const providercontext = useContext(ProviderContext);

  const [custDisplay, setCustDisplay] = useState("none");
  function done(idOfProvider, e, cust, providerName) {
    e.stopPropagation();

    let newprovidersarray = serviceproviders.map((provider) => {
      if (provider.id === idOfProvider) {
        let time = new Date().getTime();
        let customers = provider.customers.filter((cust, i) => i !== 0);
        let checkingTime = time + 1000 * 150;
        let customerResponded = false;
        let popUpTime = time + 1000 * 60;

        return {
          ...provider,
          checkingTime,
          customerResponded,
          popUpTime,
          customers,
        };
      } else {
        return provider;
      }
    });

    let date = new Date().toDateString();
    let time = new Date().toLocaleTimeString();
    let serviceWithCharges = cust.service.map((eachServiceName) => {
      return providercontext.services.find(
        (service) => service.name === eachServiceName
      );
    });

    let customerPaid = serviceWithCharges.reduce((accumulte, service) => {
      return accumulte + Number(service.charges);
    }, 0);

    let report = {
      custName: cust.name,
      custMobile: cust.mobile,
      providerName: providerName,
      date: date,
      time: time,
      services: serviceWithCharges,
      providerId: idOfProvider,
      customerPaid: customerPaid,
      addedBy: cust.addedBy,
    };

    let salonReportUpdatedArray = [report, ...salon.salonReport];

    const docRef = doc(db, "salon", salon.id);

    const payLoad = {
      ...salon,
      serviceproviders: newprovidersarray,
      salonReport: salonReportUpdatedArray,
    };

    setDoc(docRef, payLoad);
  }

  function editServices(customerIndex, providerId) {
    providercontext.setSelectedServices([]);
    providercontext.setOpen(true);
    providercontext.setAddingcustomer(false);
    providercontext.setCustIndex(customerIndex);
    providercontext.setProviderId(providerId);
  }

  async function cancelBooking(providerId, customerIndex) {
    const docRef = doc(db, "salon", salon.id);
    try {
      let newprovidersarray = await runTransaction(db, async (transaction) => {
        let thisDoc = await transaction.get(docRef);
        if (!thisDoc.exists()) {
          throw "Document does not exist!";
        }
        let arr = thisDoc.data().serviceproviders.map((provider) => {
          if (provider.id === providerId) {
            provider.customers.splice(customerIndex, 1);
            return provider;
          } else {
            return provider;
          }
        });

        transaction.update(docRef, { serviceproviders: arr });

        return arr;
      });

      dispatch(
        updateSalon({
          ...salon,
          serviceproviders: newprovidersarray,
        })
      );
    } catch (e) {
      console.error("something went wrong");
    }
  }

  return (
    <Draggable
      draggableId={`${props.custName}${props.index}`}
      key={`${props.custName}${props.index}`}
      index={props.index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          onClick={() => {
            custDisplay === "none"
              ? setCustDisplay("block")
              : setCustDisplay("none");
          }}
          className="ListNames__All"
        >
          <div className="Listnames__div">
            <p className="Listnames__name">{props.custName} </p>
            {props.index === 0 ? (
              <button
                onClick={(e) => {
                  done(props.refer, e, props.cust, props.providerName);
                }}
                className="completed__button"
              >
                DONE
              </button>
            ) : null}
            <ArrowDropDown
              style={{ position: "absolute", right: "1rem", fontSize: "5rem" }}
            />
          </div>

          <div style={{ display: custDisplay }} className="Listnames__dropdown">
            {props.mobile && (
              <div style={{ backgroundColor: "green", display: "flex" }}>
                <CallIcon
                  style={{ color: "white", margin: "1rem" }}
                  fontSize="large"
                />
                <p style={{ color: "white", fontSize: "2rem", margin: "1rem" }}>
                  {props.mobile}
                </p>
              </div>
            )}
            <ul style={{ color: "white", fontSize: "2rem", lineHeight: "2.2" }}>
              {props.service?.map((each, i) => {
                return <li key={i}>{each} </li>;
              })}
            </ul>

            <>
              <button
                onClick={() => editServices(props.index, props.refer)}
                className="serviceEditButton"
              >
                edit
              </button>

              <button
                onClick={() => {
                  cancelBooking(props.refer, props.index);
                }}
                className="serviceCancelBookingButton"
              >
                cancel booking
              </button>
            </>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default SpCustnames;
