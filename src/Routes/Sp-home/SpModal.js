import React, { useContext } from "react";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";

import "./SpModal.css";
import { doc, runTransaction } from "@firebase/firestore";
import { db } from "../../firebaseproduction";

import { useSelector, useDispatch } from "react-redux";
import {
  updateSp,
  updateCustomerName,
  updateCustomerMobile,
  updateAddingcustomer,
  updateProviderId,
  updateServices,
  updateSelectedServices,
  updateOpen,
  updateCustIndex,
  updateSalonUsername,
  updateButtonDisabled,
  updateAlertProvider,
  updateAlertMessage,
  updatePhotoUploadingProgress,
  handleOpen,
} from "../../features/providerSlice";

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
  const dispatch = useDispatch();
  const salon = useSelector((state) => state.salon.salon);
  const addingcustomer = useSelector(
    (state) => state.providerstate.addingcustomer
  );
  const providerId = useSelector((state) => state.providerstate.providerId);
  const customerName = useSelector((state) => state.providerstate.customerName);
  const customerMobile = useSelector(
    (state) => state.providerstate.customerMobile
  );
  const selectedServices = useSelector(
    (state) => state.providerstate.selectedServices
  );
  const custIndex = useSelector((state) => state.providerstate.custIndex);
  const open = useSelector((state) => state.providerstate.open);
  const services = useSelector((state) => state.providerstate.services);

  const handleClose = () => {
    dispatch(updateOpen(false));
    dispatch(updateSelectedServices([]));
    dispatch(updateCustomerName(""));
    dispatch(updateCustomerMobile(""));
  };

  async function addCustomer() {
    const docRef = doc(db, "salon", salon.id);
    try {
      let newprovidersarray;

      await runTransaction(db, async (transaction) => {
        const thisDoc = await transaction.get(docRef);

        if (!thisDoc.exists()) {
          throw "Document does not exist!";
        }

        if (addingcustomer) {
          newprovidersarray = thisDoc
            .data()
            .serviceproviders.map((provider) => {
              if (provider.id === providerId) {
                provider.customers.push({
                  email: "",
                  mobile: customerMobile,
                  name: customerName,
                  service: selectedServices,
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
              if (provider.id === providerId) {
                provider.customers = provider.customers.map(
                  (eachcust, index) => {
                    if (index === custIndex) {
                      eachcust.service = selectedServices;
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
    } catch (e) {
      console.error("something went wrong");
    }
  }
  function spCollectcheckvalue(e) {
    if (e.target.checked) {
      let selectedServicesValue = [...selectedServices, e.target.value];
      dispatch(updateSelectedServices(selectedServicesValue));
    } else {
      let selectedServicesValue = selectedServices.filter((service) => {
        return service !== e.target.value;
      });
      dispatch(updateSelectedServices(selectedServicesValue));
    }
  }

  return (
    <>
      <div>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <div style={style}>
            <div className="closeModal" onClick={handleClose}>
              X
            </div>

            {addingcustomer && (
              <div className="SpModal__label__input">
                <label className="SpModal__label" htmlFor="customerName">
                  Customer Name
                </label>
                <input
                  className="SpModal__input"
                  type="text"
                  value={customerName}
                  name="customerName"
                  onChange={(e) => {
                    dispatch(updateCustomerName(e.target.value));
                  }}
                />

                <label className="SpModal__label" htmlFor="customerMobile">
                  Customer Mobile
                </label>
                <input
                  className="SpModal__input"
                  type="number"
                  value={customerMobile}
                  name="customerMobile"
                  onChange={(e) => {
                    dispatch(updateCustomerMobile(e.target.value));
                  }}
                />
              </div>
            )}

            <div className="Services__container">
              {services?.map((service, i) => {
                return (
                  <div key={i} className="service">
                    <input
                      onChange={spCollectcheckvalue}
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
                addingcustomer
                  ? selectedServices.length === 0 || customerName === ""
                  : selectedServices.length === 0
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
