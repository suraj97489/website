import React, { useContext } from "react";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";

import Usercontext from "../../../context/UserContext";
import { db } from "../../../firebaseproduction";
import { doc, runTransaction } from "@firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import {
  updateCheckStatus,
  updateCustResponce,
  updateOverAllCustomers,
} from "../../../features/mainSlice";

const CsModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: "50rem",
  backgroundColor: "white",
  border: "2px solid #000",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "centre",
  justifyContent: "centre",
  position: "relative",
};

function CheckStatusModal() {
  const overAllCustomers = useSelector((state) => state.main.overAllCustomers);
  const dispatch = useDispatch();
  const usercontext = useContext(Usercontext);

  const checkStatus = useSelector((state) => state.main.checkStatus);
  const custResponce = useSelector((state) => state.main.custResponce);

  function CheckStatusModalClosing() {
    dispatch(updateCheckStatus(false));
    dispatch(updateCustResponce(null));
  }

  const responceArr = [
    { value: "yes", responce: "I will be there after 5 minutes" },
    {
      value: "later",
      responce: " I am busy right now(your name will remain in list)",
    },
    { value: "cancel", responce: "Sorry,cancel my booking" },
  ];

  async function updateResponce(custAnswer) {
    dispatch(updateCheckStatus(false));

    try {
      await runTransaction(db, async (transaction) => {
        let thisCustomer = overAllCustomers.find(
          (currentCust) => usercontext.customer?.email === currentCust.email
        );

        let salonId = thisCustomer?.salonId;
        let providerId = thisCustomer?.providerId;
        const docRef = doc(db, "salon", salonId);

        const thisDoc = await transaction.get(docRef);
        if (!thisDoc.exists()) {
          throw "Document does not exist!";
        }

        overAllCustomers.map((activecust) => {
          if (usercontext.customer?.email === activecust.email) {
            let thisSalon = thisDoc.data();

            let newprovidersarray = thisSalon.serviceproviders.map(
              (provider) => {
                if (provider.id === providerId) {
                  let customerIndex;
                  provider.customers.map((cust, index) => {
                    if (cust.email === activecust.email) {
                      customerIndex = index;
                    }
                  });

                  if (custAnswer === "yes") {
                    provider.customers.splice(customerIndex, 1);
                    provider.customers.splice(1, 0, activecust);

                    provider.customers.forEach((eachCust) => {
                      eachCust.checkStatus = false;
                      return eachCust;
                    });
                    provider.customerResponded = true;
                    return provider;
                  } else if (custAnswer === "later") {
                    provider.customers.forEach((eachCust, i) => {
                      if (eachCust.email === activecust.email) {
                        eachCust.checkStatus = false;
                        return eachCust;
                      }
                      if (i === 0) {
                        eachCust.checkStatus = false;
                        return eachCust;
                      } else {
                        eachCust.checkStatus = true;
                        return eachCust;
                      }
                    });
                    provider.customerResponded = true;

                    return provider;
                  } else if (custAnswer === "cancel") {
                    provider.customers.forEach((cust) => {
                      if (cust.email === activecust.email) {
                        cust.checkStatus = false;
                        return cust;
                      } else {
                        return cust;
                      }
                    });

                    let removedCust = provider.customers.filter(
                      (cust) => cust.email !== activecust.email
                    );

                    removedCust.forEach((cust, i) => {
                      if (i === 0) {
                        cust.checkStatus = false;
                      } else {
                        cust.checkStatus = true;
                      }
                    });

                    return {
                      ...provider,
                      customers: removedCust,
                      customerResponded: true,
                    };
                  }
                } else {
                  return provider;
                }
              }
            );

            transaction.update(docRef, { serviceproviders: newprovidersarray });
          }
        });
      });

      dispatch(updateCustResponce(null));

      dispatch(updateOverAllCustomers(null));
    } catch (e) {
      console.error("something went wrong");
    }
  }
  return (
    <>
      <div>
        <CsModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={checkStatus}
          onClose={CheckStatusModalClosing}
          BackdropComponent={Backdrop}
        >
          <div style={style}>
            <div
              className="closeModal"
              onClick={() => {
                dispatch(updateCheckStatus(false));
              }}
            >
              X
            </div>
            <p
              style={{
                fontSize: "3rem",
                margin: "0 1.5rem 2rem",
                textAlign: "center",
              }}
            >
              hey
              {usercontext.customer ? usercontext.customer.displayName : "user"}
              ,your appointment is after 5 minutes, please update your responce
            </p>
            {responceArr.map((each, i) => (
              <div key={i} style={{ padding: "2rem 1rem" }} className="service">
                <input
                  value={each.value}
                  // className="service__input"
                  type="radio"
                  name="checkStatus"
                  onChange={(e) => {
                    dispatch(updateCustResponce(e.target.value));
                  }}
                />
                <p style={{ marginLeft: "1.5rem" }} className="service__name">
                  {each.responce}
                </p>
              </div>
            ))}
            <button
              disabled={!custResponce}
              onClick={() => updateResponce(custResponce)}
              className="Modal__submit"
            >
              submit
            </button>
          </div>
        </CsModal>
      </div>
    </>
  );
}

export default CheckStatusModal;
