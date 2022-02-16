import React, { useContext, useEffect, useState } from "react";
import "./SalonpagetwoBodyTop.css";

import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../../../firebaseproduction";

import AlertProvider from "../../../Sp-home/alert Provider/AlertProvider";

import ProviderContext from "./../../../../context/ProviderContext";
import { useSelector } from "react-redux";

function SalonpagetwoBodyTop(props) {
  const salon = useSelector((state) => state.salon.salon);
  const shopOpen = useSelector((state) => state.main.shopOpen);
  const providercontext = useContext(ProviderContext);

  const [shopButtonText, setShopButtonText] = useState();

  let time;
  const [cTime, setcTime] = useState(time);

  function setTime() {
    time = new Date().toLocaleTimeString();
    setcTime(time);
  }

  useEffect(() => {
    let cancel = false;
    function updateTime() {
      if (cancel) return;

      setInterval(setTime, 1000);
    }
    updateTime();
    return () => {
      cancel = true;
    };
  }, []);

  function shopOpenCloseHandler(e) {
    const docRef = doc(db, "salon", salon.id);
    const payLoad = {
      ...salon,
      shopOpen: shopButtonText === "shop is open" ? false : true,
    };
    setDoc(docRef, payLoad);
  }

  return (
    <>
      <div className="salonpagetwo__body__top">
        <h2>SERVICE PROVIDERS</h2>
        {props.provider && (
          <div>
            {shopOpen ? (
              <button
                onClick={(e) => {
                  providercontext.setAlertProvider(true);
                  setShopButtonText(e.target.textContent);
                  providercontext.setAlertMessage(
                    "are you sure you want to close shop?"
                  );
                }}
              >
                shop is open
              </button>
            ) : (
              <button
                onClick={(e) => {
                  providercontext.setAlertProvider(true);
                  setShopButtonText(e.target.textContent);
                  providercontext.setAlertMessage(
                    "are you sure you want to Open shop?"
                  );
                }}
              >
                shop is Closed
              </button>
            )}
          </div>
        )}
        <p className="time">{cTime}</p>
        {/* {!props.provider && <button className="refreshButton">refresh</button>} */}
      </div>

      <AlertProvider function={shopOpenCloseHandler} buttonText="yes" />
    </>
  );
}

export default SalonpagetwoBodyTop;
