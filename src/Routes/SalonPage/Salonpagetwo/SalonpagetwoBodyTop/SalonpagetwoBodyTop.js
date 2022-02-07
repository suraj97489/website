import React, { useContext, useEffect, useState } from "react";
import "./SalonpagetwoBodyTop.css";

import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../../../firebaseproduction";
import Maincontext from "./../../../../context/MainContext";
import AlertProvider from "../../../Sp-home/alert Provider/AlertProvider";

import ProviderContext from "./../../../../context/ProviderContext";

function SalonpagetwoBodyTop(props) {
  const providercontext = useContext(ProviderContext);
  const maincontext = useContext(Maincontext);

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
    const docRef = doc(db, "salon", maincontext.salon.id);
    const payLoad = {
      ...maincontext.salon,
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
            {maincontext.shopOpen ? (
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
