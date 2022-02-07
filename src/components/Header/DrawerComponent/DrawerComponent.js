import React, { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MainContext from "../../../context/MainContext";
import { Link } from "react-router-dom";
import UserContext from "./../../../context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseproduction";

function DrawerComponent() {
  const maincontext = useContext(MainContext);
  const usercontext = useContext(UserContext);

  const pStyle = { fontSize: "2.5rem", color: "black" };

  const adminItems = [
    { path: "/dashboard", buttonName: "Dashboard" },
    { path: "/add-salon", buttonName: "Add Salon" },
    { path: "/all-salons", buttonName: "Salons" },
  ];

  const providerItems = [
    { path: "/sp-home", buttonName: "My Salon" },
    { path: "/edit-profile", buttonName: "Edit Profile" },
    { path: "/salon-report", buttonName: "Salon Report" },
    { path: "/", buttonName: "FAQ" },
    { path: "/about", buttonName: "About Us" },
    { path: "/contactus", buttonName: "Contact Us" },
  ];

  const customerItems = [
    { path: "/", buttonName: "FAQ" },
    { path: "/about", buttonName: "About Us" },
    { path: "/contactus", buttonName: "Contact Us" },
  ];

  // function navigateAdmin(e) {
  //   maincontext.setOpenDrawer(false);
  //   maincontext.setDrawerInnerText(e.target.innerText);
  // }
  function closeDrawer() {
    maincontext.setOpenDrawer(false);
  }

  async function updateSaloninLocalandcontext() {
    closeDrawer();
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
    <Drawer anchor="right" open={maincontext.openDrawer} onClose={closeDrawer}>
      <div style={{ width: "50vw" }}>
        {maincontext.user === "provider" && (
          <List>
            {providerItems.map((element, i) => (
              <Link
                key={i}
                style={{ textDecoration: "none" }}
                to={element.path}
                onClick={updateSaloninLocalandcontext}
              >
                <ListItem divider button>
                  <ListItemIcon>
                    <ListItemText>
                      <p style={pStyle}>{element.buttonName}</p>
                    </ListItemText>
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
          </List>
        )}

        {maincontext.user === "admin" && (
          <List>
            {adminItems.map((element, i) => (
              <Link
                key={i}
                style={{ textDecoration: "none" }}
                to={element.path}
                onClick={closeDrawer}
              >
                <ListItem key={i} divider button>
                  <ListItemIcon>
                    <ListItemText>
                      <p style={pStyle}>{element.buttonName}</p>
                    </ListItemText>
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
          </List>
        )}

        {maincontext.user !== "provider" && maincontext.user !== "admin" && (
          <List>
            {customerItems.map((element, i) => (
              <Link
                key={i}
                style={{ textDecoration: "none" }}
                to={element.path}
                onClick={closeDrawer}
              >
                <ListItem divider button>
                  <ListItemIcon>
                    <ListItemText>
                      <p style={pStyle}>{element.buttonName}</p>
                    </ListItemText>
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
          </List>
        )}
      </div>
    </Drawer>
  );
}

export default DrawerComponent;
