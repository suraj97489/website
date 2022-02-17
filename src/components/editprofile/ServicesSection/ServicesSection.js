import { doc, setDoc } from "@firebase/firestore";
import React, { useContext, useState } from "react";

import { db } from "../../../firebaseproduction";
import "./ServicesSection.css";

import ProviderContext from "../../../context/ProviderContext";
import { useSelector } from "react-redux";

function ServicesSection() {
  const providercontext = useContext(ProviderContext);

  const [serviceIndex, setServiceIndex] = useState();
  const [updatedService, setUpdatedService] = useState({
    name: "",
    charges: "",
  });
  const [addingService, setAddingService] = useState(false);
  const salon = useSelector((state) => state.salon.salon);

  function serviceUpdateHandler(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUpdatedService({ ...updatedService, [name]: value });
  }

  function ClickedOnEdit(i, service) {
    setAddingService(false);
    setServiceIndex(i);
    setUpdatedService({ name: service.name, charges: service.charges });
  }

  function ClickedOnDeleteService(i) {
    setAddingService(false);

    providercontext.setServices((services) => {
      let newServicesarr = services.filter((service, index) => index !== i);

      const docRef = doc(db, "salon", salon.id);
      const payLoad = { ...salon, services: newServicesarr };
      setDoc(docRef, payLoad);

      return newServicesarr;
    });
  }

  function ClickedOnCancelUpdating() {
    setServiceIndex(null);
    if (addingService) {
      providercontext.services.pop();
      setAddingService(false);
    }
  }
  function ClickedOnSaveService(i, service) {
    setAddingService(false);

    providercontext.setServices((services) => {
      let newServicesArray = services.map((service, index) => {
        if (index === i) {
          return updatedService;
        } else {
          return service;
        }
      });
      const docRef = doc(db, "salon", salon.id);
      const payLoad = { ...salon, services: newServicesArray };
      setDoc(docRef, payLoad);
      return newServicesArray;
    });
    setServiceIndex(null);
  }

  function ClickedOnAddService() {
    setAddingService(true);
    providercontext.setServices((services) => [
      ...services,
      { name: "", charges: "" },
    ]);

    setServiceIndex(providercontext.services.length);
    setUpdatedService({ name: "", charges: "" });
  }

  return (
    <div className="ServicesSection">
      {providercontext.services?.map((service, i) => {
        return (
          <div key={i} className="ServicesSection__serviceDiv">
            {serviceIndex === i ? (
              <>
                <input
                  onChange={serviceUpdateHandler}
                  name="name"
                  className="ServicesSection__Input_serviceName"
                  type="text"
                  value={updatedService.name}
                ></input>
                <input
                  onChange={serviceUpdateHandler}
                  name="charges"
                  className="ServicesSection__Input_serviceCharge"
                  type="number"
                  value={updatedService.charges}
                ></input>
                {updatedService.name !== "" && updatedService.charges !== "" && (
                  <button
                    className="ServicesSection__SaveButton"
                    onClick={() => {
                      ClickedOnSaveService(i, service);
                    }}
                  >
                    save
                  </button>
                )}
                <button
                  className="ServicesSection__CancelButton"
                  onClick={() => ClickedOnCancelUpdating(i, service)}
                >
                  cancel
                </button>
              </>
            ) : (
              <>
                <p className="ServicesSection__servicename">{service.name} </p>
                <p className="ServicesSection__serviceCharge">
                  {service.charges} Rs
                </p>
                {!addingService && (
                  <>
                    <button
                      onClick={() => ClickedOnEdit(i, service)}
                      className="ServicesSection__editservice"
                    >
                      edit
                    </button>
                    {salon.services?.length > 1 && (
                      <button
                        onClick={() => ClickedOnDeleteService(i)}
                        className="ServicesSection__deleteservice"
                      >
                        delete
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            {/* onChange={collectcheckvalue} */}
          </div>
        );
      })}

      {!addingService && (
        <button onClick={ClickedOnAddService} className="addService">
          add service
        </button>
      )}
    </div>
  );
}

export default ServicesSection;
