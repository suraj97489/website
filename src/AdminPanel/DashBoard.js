import React, { useContext, useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseproduction";
import "./DashBoard.css";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
function DashBoard() {
  const overAllCustomers = useSelector((state) => state.main.overAllCustomers);
  const usercontext = useContext(UserContext);
  const [salonsLength, setSalonsLength] = useState();

  async function findLength() {
    const querySnapshot = await getDocs(collection(db, "salon"));

    setSalonsLength(querySnapshot.docs.length);
  }
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    findLength();
    return () => {
      cancel = true;
    };
  }, []);
  if (usercontext.customer?.email === process.env.REACT_APP_ADMIN_USERNAME) {
    return (
      <div className="DashBoard">
        <Helmet>
          <title>dashboard</title>
          <meta
            name="description"
            content="you can check statistics of salons"
          />
          <link rel="canonical" href="/dashboard" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="DashBoard_top">
          <Link className="boxLink" to="/all-salons">
            <p> TOTAL SALONS</p>
            <p> {salonsLength ? salonsLength : 0}</p>
          </Link>

          <Link className="boxLink" to="/salon-report">
            <p> TOTAL USERS </p>
            <p>0</p>
          </Link>
          <Link className="boxLink" to="/salon-report">
            <p> ACTIVE USERS</p>
            <p>{overAllCustomers?.length}</p>
          </Link>
          <Link className="boxLink" to="/salon-report">
            <p> I DONT KNOW YET </p>
            <p>1000000000</p>
          </Link>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/"></Redirect>;
  }
}

export default DashBoard;
