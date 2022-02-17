import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseproduction";
import "./Salons.css";
import EachSalon from "./EachSalon";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { Helmet } from "react-helmet-async";

function Salons() {
  const [salons, setSalons] = useState();
  const customer = useSelector((state) => state.userstate.customer);
  useEffect(() => {
    let cancel = false;

    async function getAllDocs() {
      if (cancel) return;
      const querySnapshot = await getDocs(collection(db, "salon"));
      let allSalonArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setSalons(allSalonArray);
    }
    getAllDocs();
    return () => {
      cancel = true;
    };
  }, []);
  if (customer?.email === process.env.REACT_APP_ADMIN_USERNAME) {
    return (
      <div className="Salons">
        <Helmet>
          <title>All Salons</title>
          <meta
            name="description"
            content="All the salons list registered on the platform"
          />
          <link rel="canonical" href="/all-salons" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <input className="Salons__input" placeholder="search salon..." />
        {salons?.map((salon, i) => (
          <EachSalon key={i} salon={salon} />
        ))}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Salons;
