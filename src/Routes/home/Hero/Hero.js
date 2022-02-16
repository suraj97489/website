import React, { useContext, useEffect, useState } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import "./Hero.css";
import { useHistory } from "react-router";

import Maincontext from "./../../../context/MainContext";
import UserContext from "./../../../context/UserContext";
import { db } from "../../../firebaseproduction";
import Button from "@mui/material/Button";

import { secondary } from "../../../theme/colors.js";
import {
  updateSalon,
  updateSalonProvidersfordisplay,
} from "../../../features/salonSlice";
import { useDispatch, useSelector } from "react-redux";

function Hero() {
  let history = useHistory();
  const user = useSelector((state) => state.main.user);
  const maincontext = useContext(Maincontext);
  const dispatch = useDispatch();

  let usercontext = useContext(UserContext);
  let salonCodeArray = JSON.parse(localStorage.getItem("salonHistory"));
  const [loading, setLoading] = useState(false);

  const [salonHistory, setSalonHistory] = useState([]);

  useEffect(() => {
    setTimeout(updatesalonHistory, 0);

    return () => {
      clearTimeout(updatesalonHistory);
    };
  }, []);

  async function updatesalonHistory() {
    const querySnapshot = await getDocs(collection(db, "salon"));
    let allSalonArray = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    let arrayofsalons = salonCodeArray?.map((salonCode) => {
      let foundSalon = allSalonArray?.find(
        (salon) => salon.salonCode === salonCode
      );
      return foundSalon;
    });

    setSalonHistory(arrayofsalons);
  }

  const checkAndRedirect = async () => {
    let findSalon;
    setLoading(true);
    const q = query(
      collection(db, "salon"),
      where("salonCode", "==", maincontext.salonCode.toLowerCase())
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.data().salonCode === maincontext.salonCode.toLowerCase()) {
        findSalon = { ...doc.data(), id: doc.id };
      }
    });

    if (findSalon) {
      // ============================setting item in local storage=================================

      dispatch(updateSalon(findSalon));
      localStorage.setItem("salon", findSalon.salonCode);
      let arr = findSalon.serviceproviders.map((salon) => {
        return { ...salon, display: "none" };
      });
      dispatch(updateSalonProvidersfordisplay(arr));

      let grahakEmail = localStorage.getItem("grahak").email;

      if (grahakEmail === undefined) {
        if (usercontext.customer) {
          let setGrahakInLocal = {
            fname: usercontext.customer.displayName?.split(" ")[0],
            lname: usercontext.customer.displayName?.split(" ")[1],
            mobile: "",
            service: [],
            email: usercontext.customer.email,
          };

          localStorage.setItem("grahak", JSON.stringify(setGrahakInLocal));

          maincontext.setGrahak(setGrahakInLocal);
        }
      }

      //== ===========================updating salon history at loacalStorage==================================
      salonHistoryHandler(findSalon);
      function navigatingFunc() {
        return new Promise((res, rej) => {
          history.push("/sign-in-with-google");
          res("pushed");
        });
      }
      navigatingFunc().then((res) => {
        setLoading(false);
      });
    } else {
      alert("please enter valid SALON CODE");
      setLoading(false);
    }
    maincontext.setSalonCode("");
  };

  async function salonHistoryHandler(findSalon) {
    let salonHistory = JSON.parse(localStorage.getItem("salonHistory"));
    if (salonHistory) {
      let salonCodeArray = salonHistory.filter(
        (code) => code !== findSalon.salonCode
      );
      salonCodeArray.unshift(findSalon.salonCode);
      localStorage.setItem("salonHistory", JSON.stringify(salonCodeArray));
    } else {
      let salonCodeArray = [findSalon.salonCode];
      localStorage.setItem("salonHistory", JSON.stringify(salonCodeArray));
    }
  }

  function navigateToSalonHandler(salon) {
    if (user === "customer") {
      history.push("/salonpage");

      dispatch(updateSalon(salon));
      localStorage.setItem("salon", salon.salonCode);
    } else {
      history.push("/sign-in-with-google");
    }
  }

  return (
    <>
      <div className="hero">
        <div className="mleft">
          <h2 className="enterSalonCode">ENTER SALONCODE</h2>

          <input
            type="text"
            value={maincontext.salonCode}
            onChange={maincontext.salonCodeValue}
            className="hero__input"
            placeholder="type salon code provided at salon"
          />

          {/* <button onClick={checkAndRedirect} className="button" id="enter">
            <b> ENTER</b>
            {loading ? (
              <CircularProgress size="2rem" style={{ color: "black" }} />
            ) : null}
          </button> */}

          <Button
            className="button"
            style={{
              backgroundColor: secondary,
              color: "black",
              fontSize: "2rem",
            }}
            onClick={checkAndRedirect}
            id="enter"
            variant="contained"
          >
            <b> Submit</b>
            {loading ? (
              <CircularProgress size="2rem" style={{ color: "black" }} />
            ) : null}
          </Button>

          {/* <Link className="secondary" to="/registration">
            <button
              onClick={() => {
               
              }}
              className="button"
              id="log-in"
            >
              <b>Log in</b>
            </button>
          </Link> */}
        </div>

        <div className="mright">
          <p className="quote">
            YOU CANNOT SAVE YIME, BUT YOU CAN SPEND TIME DIFFERENTLY
          </p>
          <strong>-BRIAN TRACY</strong>
        </div>
      </div>
      {salonHistory?.length > 0 && (
        <>
          <div className="recent__Visits">
            <p>recent visits</p>
          </div>
          <div className="salonHistory">
            {
              salonHistory?.map((salon, i) => (
                <div
                  key={i}
                  className="salonHistory__salonDiv"
                  onClick={salon ? () => navigateToSalonHandler(salon) : null}
                >
                  <div className="salonHistory__ImageWrapper_div">
                    <img
                      src={
                        salon?.salonPhoto ||
                        process.env.REACT_APP_TEMPORARY_SALON_PIC
                      }
                      height="10rem"
                      width="10rem"
                      title="salon-pic"
                      alt="salon_photo"
                      loading="eager"
                    />
                  </div>
                  <p>{salon?.salonName}</p>
                </div>
              ))
              // :
              //  (
              //   <p style={{ padding: "2rem", color: "white", fontSize: "2rem" }}>
              //     there are no recent visit's to show
              //   </p>

              // )
            }
          </div>
        </>
      )}
    </>
  );
}

export default Hero;
