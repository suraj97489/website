import { useContext, useState } from "react";
import "./Registration.css";

import { useHistory } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../firebaseproduction";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { updateSalon } from "../../features/salonSlice";
import { updateNotify, updateUser } from "../../features/mainSlice";
import { updateSp } from "../../features/providerSlice";

function Registration() {
  const dispatch = useDispatch();
  const sp = useSelector((state) => state.providerstate.sp);
  const [clickedOnSubmit, setClickedOnSubmit] = useState(false);
  let history = useHistory();
  const auth = getAuth();

  function spUpdateHandler(e) {
    let name = e.target.name;
    let value = e.target.value;
    let removedSpaces = value.replace(/ /g, "");
    let spValue = { ...sp, [name]: removedSpaces };
    dispatch(updateSp(spValue));
  }

  function providerLoginHandler(e) {
    setClickedOnSubmit(true);
    e.preventDefault();
    // ==========================================================new==================
    signInWithEmailAndPassword(auth, sp.salonUsername, sp.salonPassword)
      .then((userCredential) => {
        setClickedOnSubmit(false);
        const user = userCredential.user;

        dispatch(updateUser("provider"));
        async function updateSalonValue() {
          const querySnapshot = await getDocs(collection(db, "salon"));
          let allSalonArray = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });

          let hisSalon = allSalonArray.find((salon) => {
            return salon.salonUsername === user.email;
          });
          await dispatch(updateSalon(hisSalon));

          localStorage.setItem("salon", hisSalon.salonCode);
        }
        updateSalonValue().then(() => {
          history.push("/sp-home");
        });
      })
      .catch((error) => {
        setClickedOnSubmit(false);
        // const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          // alert("please enter valid password");

          dispatch(
            updateNotify({
              message: "please enter valid password",
              style: {
                backgroundColor: "red",
                color: "white",
              },
            })
          );
        } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          // alert("please enter valid Username");
          dispatch(
            updateNotify({
              message: "please enter valid Username",
              style: {
                backgroundColor: "red",
                color: "white",
              },
            })
          );

          // alert(errorMessage);
        } else {
          dispatch(
            updateNotify({
              message: errorMessage,
              style: {
                backgroundColor: "red",
                color: "white",
              },
            })
          );
        }
      });
  }
  if (clickedOnSubmit) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <div className="registration">
        <Helmet>
          <title>Registration</title>
          <meta
            name="description"
            content="Enter your salon username and password for login."
          />
          <link rel="canonical" href="/registration" />
        </Helmet>
        <h2>Log in as Service Provider</h2>
        <form className="registration_form">
          <div className="labelandinput">
            <label>Username</label>
            <input
              name="salonUsername"
              value={sp?.salonUsername}
              onChange={spUpdateHandler}
              className="registration_input "
              type="text"
              required
            />
          </div>

          <div className="labelandinput">
            <label>password</label>
            <input
              type="password"
              name="salonPassword"
              value={sp?.salonPassword}
              onChange={spUpdateHandler}
              className="registration_input "
              required
            />
          </div>

          <button
            onClick={providerLoginHandler}
            className="registration_submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default Registration;
