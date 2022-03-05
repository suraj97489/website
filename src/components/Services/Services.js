import React from "react";
import "./Services.css";
import { useDispatch, useSelector } from "react-redux";

import { updateGrahak } from "../../features/mainSlice";

function Services() {
  const dispatch = useDispatch();
  const grahak = useSelector((state) => state.main.grahak);
  const services = useSelector((state) => state.providerstate.services);

  function collectcheckvalue(e) {
    let grahakValue;
    if (e.target.checked) {
      grahakValue = {
        ...grahak,
        service: [...grahak.service, e.target.value],
      };
    } else {
      let unchecked = grahak.service.filter((service) => {
        return service !== e.target.value;
      });
      grahakValue = { ...grahak, service: [...unchecked] };
    }
    dispatch(updateGrahak(grahakValue));
  }
  return (
    <>
      <div className="Services__container">
        {services.map((service, i) => {
          return (
            <div key={i} className="service">
              <input
                onChange={collectcheckvalue}
                value={service.name}
                className="service__input"
                type="checkbox"
              />
              <p className="service__name">{service.name} </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Services;
