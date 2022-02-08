import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import DrawerComponent from "./DrawerComponent/DrawerComponent";
import MenuIcon from "@material-ui/icons/Menu";

import Maincontext from "./../../context/MainContext";
import UserContext from "./../../context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseproduction";

function Header() {
  const maincontext = useContext(Maincontext);
  const usercontext = useContext(UserContext);

  async function updateSaloninLocalandcontext() {
    if (usercontext.customer.email !== maincontext.salon.salonUsername) {
      const querySnapshot = await getDocs(collection(db, "salon"));
      querySnapshot.forEach((doc) => {
        let salonUsername = doc.data().salonUsername;
        if (salonUsername === usercontext.customer.email) {
          maincontext.setSalon({ ...doc.data(), id: doc.id });
          localStorage.setItem("salon", doc.data().salonCode);
        }
      });
    }
  }
  return (
    <>
      <header>
        <Link to="/">
          <h2 className="logo">SALONKATTA</h2>
        </Link>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/"> Home</Link>
            </li>

            {maincontext.user === "provider" && (
              <li onClick={updateSaloninLocalandcontext}>
                <Link to="/salon-report"> report</Link>
              </li>
            )}

            <li>
              <Link to="/about"> About Us</Link>
            </li>

            <li>
              <Link to="/contactus"> Contact Us</Link>
            </li>

            <li>
              <Link to="/">FAQ</Link>
            </li>

            {maincontext.user === "provider" && (
              <li onClick={updateSaloninLocalandcontext}>
                <Link to="/edit-profile">edit profile</Link>
              </li>
            )}
          </ul>
        </nav>

        <DrawerComponent></DrawerComponent>
        <div className="menuIcon">
          <MenuIcon
            onClick={() => {
              maincontext.setOpenDrawer(true);
            }}
            style={{
              fontSize: "5rem",
              position: "absolute",
              right: "2rem",
              top: "1.2rem",
            }}
          ></MenuIcon>
        </div>
      </header>
    </>
  );
}

export default Header;
