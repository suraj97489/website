import React, { useContext } from "react";
import Maincontext from "../../../context/MainContext";
import SalonDetailsHeading from "../SalonDetailsHeading";
import "./SalonStatistics.css";
function SalonStatistics() {
  const { salon, detailsHeading } = useContext(Maincontext);

  let addedBySalonLength = salon?.salonReport?.filter(
    (each) => each.addedBy === "provider"
  ).length;
  let BookedByCustomerLength = salon?.salonReport?.filter(
    (each) => each.addedBy === "customer"
  ).length;

  let TotalBookingsLength = salon?.salonReport?.length;

  return (
    <>
      <SalonDetailsHeading heading="SALON STATISTICS" />
      {detailsHeading === "SALON STATISTICS" && (
        <>
          <div className="SalonStatistics">
            <div className="SalonStatistics_eachDiv">
              <h3>Registerd Date </h3> <h3>:</h3>
              <p>{salon?.registeredAt}</p>
            </div>
            <div className="SalonStatistics_eachDiv">
              <h3>Total bookings</h3> <h3>:</h3>
              <p>{TotalBookingsLength}</p>
            </div>
            <div className="SalonStatistics_eachDiv">
              <h3>Added By Salon </h3> <h3>:</h3>
              <p>
                {addedBySalonLength +
                  " " +
                  `(${Math.round(
                    (addedBySalonLength / TotalBookingsLength) * 100
                  )}` +
                  "%)"}
              </p>
            </div>
            <div className="SalonStatistics_eachDiv">
              <h3>Booked By Customer </h3> <h3>:</h3>
              <p>
                {BookedByCustomerLength +
                  " " +
                  `(${Math.round(
                    (BookedByCustomerLength / TotalBookingsLength) * 100
                  )}` +
                  "%)"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SalonStatistics;
