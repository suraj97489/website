import { doc, setDoc } from "@firebase/firestore";
import React, { useState } from "react";

import { db } from "../../../firebaseproduction";
import "./ServicesSection.css";

import { useSelector, useDispatch } from "react-redux";
import { updateServices } from "../../../features/providerSlice";

function ServicesSection() {
  const dispatch = useDispatch();
  const [serviceIndex, setServiceIndex] = useState();
  const [updatedService, setUpdatedService] = useState({
    name: "",
    charges: "",
  });
  const [addingService, setAddingService] = useState(false);
  const salon = useSelector((state) => state.salon.salon);
  const services = useSelector((state) => state.providerstate.services);

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

    let newServicesarr = services.filter((service, index) => index !== i);
    dispatch(updateServices(newServicesarr));
    const docRef = doc(db, "salon", salon.id);
    const payLoad = { ...salon, services: newServicesarr };
    setDoc(docRef, payLoad);
  }

  function ClickedOnCancelUpdating() {
    setServiceIndex(null);
    if (addingService) {
      services.pop();
      setAddingService(false);
    }
  }
  function ClickedOnSaveService(i, service) {
    setAddingService(false);
    let newServicesArray = services.map((service, index) => {
      if (index === i) {
        return updatedService;
      } else {
        return service;
      }
    });
    dispatch(updateServices(newServicesArray));
    const docRef = doc(db, "salon", salon.id);
    const payLoad = { ...salon, services: newServicesArray };
    setDoc(docRef, payLoad);

    setServiceIndex(null);
  }

  function ClickedOnAddService() {
    setAddingService(true);
    let newArr = [...services, { name: "", charges: "" }];
    dispatch(updateServices(newArr));
    setServiceIndex(services.length);
    setUpdatedService({ name: "", charges: "" });
  }

  return (
    <div className="ServicesSection">
      {services?.map((service, i) => {
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
