import React, { useContext, useState } from "react";

import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import "./Custnames.css";
import scissor from "./../../../../../../images/scissor.png";
import { doc, runTransaction } from "@firebase/firestore";
import { db } from "../../../../../../firebaseproduction";

import Maincontext from "./../../../../../../context/MainContext";
import ProviderContext from "./../../../../../../context/ProviderContext";
import { useSelector } from "react-redux";

function Custnames(props) {
  const salon = useSelector((state) => state.salon.salon);
  const maincontext = useContext(Maincontext);
  const providercontext = useContext(ProviderContext);

  const [custDisplay, setCustDisplay] = useState("none");

  function editServices(refer, customerIndex) {
    maincontext.setIsOpen(true);
    maincontext.grahak.service = [];
    maincontext.setIdOfProvider(refer);
    providercontext.setCustIndex(customerIndex);
    providercontext.setAddingcustomer(false);
  }

  async function cancelBooking(refer, customerIndex) {
    const docRef = doc(db, "salon", salon.id);
    try {
      const cancelFunc = (salonValue) => {
        return salonValue.serviceproviders.map((provider) => {
          if (provider.id === refer) {
            provider.customers.splice(customerIndex, 1);
            return provider;
          } else {
            return provider;
          }
        });
      };

      maincontext.setSalon((salon) => ({
        ...salon,
        serviceproviders: cancelFunc(salon),
      }));

      let updatedArrayofProviders = await runTransaction(
        db,
        async (transaction) => {
          const thisDoc = await transaction.get(docRef);
          if (!thisDoc.exists()) {
            throw "Document does not exist!";
          }
          let arr = cancelFunc(thisDoc.data());

          transaction.update(docRef, { serviceproviders: arr });
          return arr;
        }
      );

      maincontext.setSalon({
        ...salon,
        serviceproviders: updatedArrayofProviders,
      });
    } catch (e) {
      console.error("something went wrong");
    }
  }

  return (
    <div
      onClick={() => {
        custDisplay === "none"
          ? setCustDisplay("block")
          : setCustDisplay("none");
      }}
      className="ListNames__All"
    >
      <div className="Listnames__div">
        <p className="Listnames__name">{props.custName}</p>
        {props.index === 0 ? (
          <div>
            <img
              width="4rem"
              height="3rem"
              src={scissor}
              className="scissor"
              alt="scissor"
              title="scissor"
              loading="eager"
            ></img>
          </div>
        ) : null}
        <ArrowDropDown
          style={{ position: "absolute", right: "1rem", fontSize: "5rem" }}
        />
      </div>

      <div style={{ display: custDisplay }} className="Listnames__dropdown">
        <ul style={{ color: "white", fontSize: "1.5rem", lineHeight: "1.5" }}>
          {props.service.map((each, i) => {
            return <li key={each + i}>{each}</li>;
          })}
        </ul>

        {props.email === maincontext.grahak.email && props.index !== 0 && (
          <>
            <button
              onClick={() => editServices(props.refer, props.index)}
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
        )}
      </div>
    </div>
  );
}

export default Custnames;
