import React, { Fragment, useContext, useEffect } from "react";
import "./AddSalon.css";
import AddSalonLogic from "./AddSalonLogic";

import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
function AddSalon() {
  const allSalon = useSelector((state) => state.main.allSalon);
  const customer = useSelector((state) => state.userstate.customer);

  const {
    addSalon,
    salonLoginData,
    addSalonFormArray,
    setButtonDisabled,
    updateAddSalonValue,
    alreadyExist,
    addSalonHandler,
    updateAddProviderValue,
    message,
    buttonDisabled,
  } = AddSalonLogic();

  useEffect(() => {
    if (
      addSalon.address &&
      addSalon.salonName &&
      salonLoginData.salonUsername &&
      salonLoginData.salonPassword.length > 5 &&
      addSalon.mobile.length === 10 &&
      addSalon.salonCode.length > 5 &&
      allSalon.every((salon) => addSalon.salonCode !== salon.salonCode) &&
      addSalon.serviceproviders[0].mobile.length === 10 &&
      addSalon.serviceproviders[0].fname &&
      addSalon.serviceproviders[0].lname
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [addSalon, salonLoginData]);
  if (customer?.email === process.env.REACT_APP_ADMIN_USERNAME) {
    return (
      <div className="AddSalon">
        <Helmet>
          <title>Add Salon</title>
          <meta
            name="description"
            content="Enter form details and Add salon."
          />
          <link rel="canonical" href="/add-salon" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <form>
          {addSalonFormArray.map((each, i) => {
            return (
              <Fragment key={i}>
                <label>{each.label}</label>
                <input
                  onChange={updateAddSalonValue}
                  value={each.value}
                  name={each.name}
                  type={each.type}
                  style={
                    each.name === "salonCode"
                      ? { border: alreadyExist ? "2px solid red" : "none" }
                      : {}
                  }
                ></input>
              </Fragment>
            );
          })}
        </form>
        <form onSubmit={addSalonHandler}>
          <h4>PROVIDER INFO</h4>
          <label> First Name</label>
          <input
            onChange={updateAddProviderValue}
            value={addSalon.serviceproviders[0].fname}
            name="fname"
            type="text"
          ></input>

          <label> Last Name</label>
          <input
            onChange={updateAddProviderValue}
            value={addSalon.serviceproviders[0].lname}
            name="lname"
            type="text"
          ></input>

          <label>Mobile</label>
          <input
            onChange={updateAddProviderValue}
            value={addSalon.serviceproviders[0].mobile}
            name="mobile"
            type="number"
          ></input>
          <p style={{ fontSize: "2rem", color: "red" }}>{message}</p>
          <button
            disabled={buttonDisabled}
            type="submit"
            className="Add__Salon__button"
          >
            Add Salon
          </button>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default AddSalon;
