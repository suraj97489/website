import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./SalonReport.css";
import SearchIcon from "@material-ui/icons/Search";
import UserContext from "../../context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

function SalonReport() {
  const salon = useSelector((state) => state.salon.salon);

  const usercontext = useContext(UserContext);
  const [items, setItems] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  let report = salon?.salonReport;

  useEffect(() => {
    function updateReport() {
      let show = report?.filter((report, i) => i <= 100);
      setItems(show);
    }

    updateReport();

    return () => {
      updateReport();
    };
  }, [salon]);

  useEffect(() => {
    if (searchTerm !== "") {
      setItems(report);
    }
  }, [searchTerm]);

  function fetchData() {
    let itemslength = items.length + 100;
    let updatedItems = report.filter((report, i) => i <= itemslength);
    setItems(updatedItems);
  }

  let filteredItems = items?.filter((item) => {
    if (searchTerm === "") {
      return item;
    } else if (item.custName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else if (
      item.providerName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return item;
    } else if (item.date.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else if (item.time.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else if (
      item.services.some((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) {
      return item;
    }
  });

  if (items && salon.salonUsername === usercontext.customer?.email) {
    return (
      <>
        <Helmet>
          <title>Salonkatta- Salon Report</title>
          <meta
            name="description"
            content="you can check report of your salon by searching provider name,date ,customer's name or customer's mobile."
          />
          <link rel="canonical" href="/salon-report" />
        </Helmet>
        <div className="SalonReport__Top">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="SalonReport__Input"
            type="text"
            placeholder="search..."
          ></input>
          <SearchIcon
            className="SalonReport__SearchIcon"
            style={{ fontSize: "5rem" }}
          ></SearchIcon>
        </div>
        <div
          className="SalonReport__filter__result"
          style={{ opacity: searchTerm ? "1" : "0" }}
        >
          <p>search result:{filteredItems.length}</p>
          <p>
            revenue:
            {filteredItems.reduce((accumulte, report) => {
              return accumulte + Number(report.customerPaid);
            }, 0)}
          </p>
        </div>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={items.length > 100 && <h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {filteredItems.map((each, i) => {
            return (
              <div className="SalonReport__wrapper" key={i}>
                <div className="SalonReport__NM">
                  <p>{each.custName}</p> <p>{each.custMobile}</p>
                </div>
                <div className="SalonReport__services">
                  <ol>
                    {each.services.map((each, i) => (
                      <li key={i}>{each.name}</li>
                    ))}
                  </ol>
                </div>
                <div className="SalonReport__serviceCharges">
                  <ul>
                    {each.services.map((each, i) => (
                      <li key={i}>{Number(each.charges)} Rs</li>
                    ))}
                  </ul>
                  <strong>
                    {each.services.reduce((accumulte, service) => {
                      return accumulte + Number(service.charges);
                    }, 0)}
                    Rs
                  </strong>
                </div>
                <p className="SalonReport__providerName">{each.providerName}</p>
                <p className="SalonReport__Date">{each.date}</p>
                <p className="SalonReport__Time">{each.time}</p>
              </div>
            );
          })}
        </InfiniteScroll>
      </>
    );
  } else {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}

export default SalonReport;
