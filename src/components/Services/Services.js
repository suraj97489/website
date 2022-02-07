import React, { useContext } from "react";
import "./Services.css";

import Maincontext from "./../../context/MainContext";
import ProviderContext from "./../../context/ProviderContext";

function Services() {
  const maincontext = useContext(Maincontext);
  const providercontext = useContext(ProviderContext);

  function collectcheckvalue(e) {
    maincontext.setGrahak((old) => {
      if (e.target.checked) {
        return {
          ...old,
          service: [...maincontext.grahak.service, e.target.value],
        };
      } else {
        let unchecked = old.service.filter((service) => {
          return service !== e.target.value;
        });
        return { ...old, service: [...unchecked] };
      }
    });
  }
  return (
    <>
      <div className="Services__container">
        {providercontext.services.map((service, i) => {
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
