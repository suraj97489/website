import { doc, runTransaction } from "@firebase/firestore";
import React, { useContext } from "react";
import Maincontext from "../../../context/MainContext";
import ProviderContext from "../../../context/ProviderContext";
import UserContext from "../../../context/UserContext";
import "./Modal.css";
import { db } from "../../../firebaseproduction";

import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";
import Services from "./../../../components/Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { updateSalon } from "../../../features/salonSlice";

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

function Modal() {
  const salon = useSelector((state) => state.salon.salon);
  const dispatch = useDispatch();
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);
  const providercontext = useContext(ProviderContext);

  const closeCustomerModal = () => {
    // maincontext.grahak.service = [];
    maincontext.setGrahak((grahak) => ({
      ...grahak,
      service: [],
      mobile: "",
    }));
    providercontext.addingcustomer
      ? usercontext.setUserBooked(false)
      : usercontext.setUserBooked(true);
    maincontext.setIsOpen(false);
  };

  function updateGrahaksMobile(e) {
    let value = e.target.value;
    if (value.includes(".")) return;
    maincontext.setGrahak((grahak) => ({
      ...grahak,
      mobile: value.length > 10 ? grahak.mobile : value,
    }));
  }

  async function changeModalState() {
    usercontext.setUserBooked(true);
    const docRef = doc(db, "salon", salon.id);

    let newCustomer = {
      name: usercontext.customer.displayName,
      mobile: maincontext.grahak.mobile,
      service: maincontext.grahak.service,
      email: maincontext.grahak.email,
      checkStatus: false,
      salonId: salon.id,
      providerId: maincontext.idOfProvider,
      addedBy: "customer",
    };

    try {
      const addOrEditCustomer = (receivedSalon) => {
        return receivedSalon.serviceproviders.map((each) => {
          if (each.id === maincontext.idOfProvider) {
            if (providercontext.addingcustomer) {
              each.customers.push(newCustomer);

              return each;
            } else {
              let updatedCustomers = each.customers.map((cust, i) => {
                if (providercontext.custIndex === i) {
                  return { ...cust, service: maincontext.grahak.service };
                } else {
                  return cust;
                }
              });
              return { ...each, customers: updatedCustomers };
            }
          } else {
            return each;
          }
        });
      };
      dispatch(
        updateSalon({
          ...salon,
          serviceproviders: addOrEditCustomer(salon),
        })
      );

      maincontext.setIsOpen(false);
      await runTransaction(db, async (transaction) => {
        const thisDoc = await transaction.get(docRef);
        if (!thisDoc.exists()) {
          throw "Document does not exist!";
        }

        let arr = addOrEditCustomer(thisDoc.data());
        transaction.update(docRef, { serviceproviders: arr });
      });
    } catch (e) {
      alert("somethng went wrong");
    }
  }

  return (
    <>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={maincontext.isOpen}
        onClose={closeCustomerModal}
        BackdropComponent={Backdrop}
      >
        <div style={style}>
          <div className="closeModal" onClick={closeCustomerModal}>
            X
          </div>
          {providercontext.addingcustomer && (
            <>
              <label style={{ fontSize: "2rem" }}>MOBILE</label>
              <input
                style={{ height: "5rem", margin: "1rem 0" }}
                placeholder="enter your mobile..."
                value={maincontext.grahak.mobile}
                type="number"
                onChange={updateGrahaksMobile}
              ></input>
            </>
          )}
          <Services />
          <button
            disabled={
              providercontext.addingcustomer
                ? maincontext.grahak.service.length === 0 ||
                  maincontext.grahak.mobile?.length !== 10
                : maincontext.grahak.service.length === 0
            }
            id="ModalSubmit"
            onClick={(e) => changeModalState(e)}
            className="Modal__submit"
          >
            submit
          </button>
        </div>
      </StyledModal>
    </>
  );
}

export default Modal;
