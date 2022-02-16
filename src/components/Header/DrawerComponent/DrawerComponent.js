import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { Link } from "react-router-dom";
import UserContext from "./../../../context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseproduction";
import { useDispatch, useSelector } from "react-redux";
import { updateSalon } from "../../../features/salonSlice";
import { updateOpenDrawer } from "../../../features/mainSlice";

function DrawerComponent() {
  const usercontext = useContext(UserContext);
  const user = useSelector((state) => state.main.user);
  const openDrawer = useSelector((state) => state.main.openDrawer);
  const dispatch = useDispatch();
  const pStyle = { fontSize: "2.5rem", color: "black" };
  const salon = useSelector((state) => state.salon.salon);
  const adminItems = [
    { path: "/dashboard", buttonName: "Dashboard" },
    { path: "/add-salon", buttonName: "Add Salon" },
    { path: "/all-salons", buttonName: "Salons" },
  ];

  const providerItems = [
    { path: "/sp-home", buttonName: "My Salon" },
    { path: "/edit-profile", buttonName: "Edit Profile" },
    { path: "/salon-report", buttonName: "Salon Report" },

    { path: "/about", buttonName: "About Us" },
    { path: "/contactus", buttonName: "Contact Us" },
  ];

  const customerItems = [
    { path: "/", buttonName: "Home" },
    { path: "/about", buttonName: "About Us" },
    { path: "/contactus", buttonName: "Contact Us" },
  ];

  function closeDrawer() {
    dispatch(updateOpenDrawer(false));
  }

  async function updateSaloninLocalandcontext() {
    closeDrawer();
    if (usercontext.customer.email !== salon.salonUsername) {
      const querySnapshot = await getDocs(collection(db, "salon"));
      querySnapshot.forEach((doc) => {
        let salonUsername = doc.data().salonUsername;
        if (salonUsername === usercontext.customer.email) {
          dispatch(updateSalon({ ...doc.data(), id: doc.id }));
          localStorage.setItem("salon", doc.data().salonCode);
        }
      });
    }
  }
  return (
    <Drawer anchor="right" open={openDrawer} onClose={closeDrawer}>
      <div style={{ width: "50vw" }}>
        {user === "provider" && (
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

        {user === "admin" && (
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

        {user !== "provider" && user !== "admin" && (
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
