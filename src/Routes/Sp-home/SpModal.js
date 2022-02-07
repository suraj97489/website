import React, { useContext } from "react";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";

import "./SpModal.css";
import { doc, setDoc, runTransaction } from "@firebase/firestore";
import { db } from "../../firebaseproduction";
import ProviderContext from "./../../context/ProviderContext";
import Maincontext from "./../../context/MainContext";

const StyledModal = styled(ModalUnstyled)`
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
  width: "40rem",
  backgroundColor: "white",
  border: "2px solid #000",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "centre",
  justifyContent: "centre",
  position: "relative",
};

function SpModal(props) {
  const providercontext = useContext(ProviderContext);
  const maincontext = useContext(Maincontext);

  const handleClose = () => {
    providercontext.setOpen(false);
    providercontext.setSelectedServices = [];
    providercontext.setCustomerName("");
    providercontext.setCustomerMobile("");
  };

  async function addCustomer() {
    const docRef = doc(db, "salon", maincontext.salon.id);
    try {
      let newprovidersarray;

      await runTransaction(db, async (transaction) => {
        const thisDoc = await transaction.get(docRef);

        if (!thisDoc.exists()) {
          throw "Document does not exist!";
        }

        if (providercontext.addingcustomer) {
          newprovidersarray = thisDoc
            .data()
            .serviceproviders.map((provider) => {
              if (provider.id === providercontext.providerId) {
                provider.customers.push({
                  email: "",
                  mobile: providercontext.customerMobile,
                  name: providercontext.customerName,
                  service: providercontext.selectedServices,
                  checkStatus: false,
                  addedBy: "provider",
                });

                return provider;
              } else {
                return provider;
              }
            });

          transaction.update(docRef, { serviceproviders: newprovidersarray });
        } else {
          newprovidersarray = thisDoc
            .data()
            .serviceproviders.map((provider) => {
              if (provider.id === providercontext.providerId) {
                provider.customers = provider.customers.map(
                  (eachcust, index) => {
                    if (index === providercontext.custIndex) {
                      eachcust.service = providercontext.selectedServices;
                      return eachcust;
                    } else {
                      return eachcust;
                    }
                  }
                );
                return provider;
              } else {
                return provider;
              }
            });

          transaction.update(docRef, { serviceproviders: newprovidersarray });
        }
      });

      handleClose();
      maincontext.setServiceProviders(newprovidersarray);
    } catch (e) {
      console.error("something went wrong");
    }
  }

  return (
    <>
      <div>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={providercontext.open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <div style={style}>
            <div className="closeModal" onClick={handleClose}>
              X
            </div>

            {providercontext.addingcustomer && (
              <div className="SpModal__label__input">
                <label className="SpModal__label" htmlFor="customerName">
                  Customer Name
                </label>
                <input
                  className="SpModal__input"
                  type="text"
                  value={providercontext.customerName}
                  name="customerName"
                  onChange={(e) => {
                    providercontext.setCustomerName(e.target.value);
                  }}
                />

                <label className="SpModal__label" htmlFor="customerMobile">
                  Customer Mobile
                </label>
                <input
                  className="SpModal__input"
                  type="number"
                  value={providercontext.customerMobile}
                  name="customerMobile"
                  onChange={(e) => {
                    providercontext.setCustomerMobile(e.target.value);
                  }}
                />
              </div>
            )}

            <div className="Services__container">
              {providercontext.services?.map((service, i) => {
                return (
                  <div key={i} className="service">
                    <input
                      onChange={providercontext.spCollectcheckvalue}
                      value={service.name}
                      className="service__input"
                      type="checkbox"
                    />
                    <p className="service__name">{service.name} </p>
                  </div>
                );
              })}
            </div>
            <button
              disabled={
                providercontext.addingcustomer
                  ? providercontext.selectedServices.length === 0 ||
                    providercontext.customerName === ""
                  : providercontext.selectedServices.length === 0
              }
              onClick={addCustomer}
              className="Modal__submit"
            >
              submit
            </button>
          </div>
        </StyledModal>
      </div>
    </>
  );
}

export default SpModal;
