import React, { useEffect, useContext, useState } from "react";
import SalonDetailsHeading from "../SalonDetailsHeading";
import "./LoginCredentials.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import MainContext from "./../../../context/MainContext";
import { db } from "../../../firebaseproduction";

function LoginCredentials() {
  const { salon, detailsHeading } = useContext(MainContext);
  const [LoginCredentials, setLoginCredentials] = useState();
  useEffect(() => {
    async function getLoginCredential() {
      const q = query(
        collection(db, "loginData"),
        where("salonCode", "==", salon.salonCode)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        doc.data().salonCode === salon.salonCode
          ? setLoginCredentials(doc.data())
          : setLoginCredentials();
      });
    }
    getLoginCredential();
    return () => {
      getLoginCredential();
    };
  }, []);
  return (
    <>
      <SalonDetailsHeading heading="Login CREDENTIAL" />
      {detailsHeading === "Login CREDENTIAL" && (
        <div className="LoginCredentials">
          <div>
            <h3>Salon Username</h3>
            <h3>:</h3>
            <p>{LoginCredentials?.salonUsername}</p>
          </div>
          <div>
            <h3>Salon Password</h3>
            <h3>:</h3>
            <p>{LoginCredentials?.salonPassword}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginCredentials;
