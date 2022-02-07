import react, { useContext, useState } from "react";
import "./Registration.css";
import ProviderContext from "../../context/ProviderContext";
import Maincontext from "../../context/MainContext";
import { useHistory } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../firebaseproduction";
import { collection, getDocs } from "firebase/firestore";

function Registration() {
  const providercontext = useContext(ProviderContext);
  const maincontext = useContext(Maincontext);
  const [clickedOnSubmit, setClickedOnSubmit] = useState(false);
  let history = useHistory();
  const auth = getAuth();

  function spUpdateHandler(e) {
    let name = e.target.name;
    let value = e.target.value;
    let removedSpaces = value.replace(/ /g, "");

    providercontext.setSp((old) => {
      return { ...old, [name]: removedSpaces };
    });
  }

  function providerLoginHandler(e) {
    setClickedOnSubmit(true);
    e.preventDefault();
    // ==========================================================new==================
    signInWithEmailAndPassword(
      auth,
      providercontext.sp.salonUsername,
      providercontext.sp.salonPassword
    )
      .then((userCredential) => {
        setClickedOnSubmit(false);
        const user = userCredential.user;
        maincontext.setUser("provider");
        async function updateSalon() {
          const querySnapshot = await getDocs(collection(db, "salon"));
          let allSalonArray = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });

          let hisSalon = allSalonArray.find((salon) => {
            return salon.salonUsername === user.email;
          });
          await maincontext.setSalon(hisSalon);
          localStorage.setItem("salon", hisSalon.salonCode);
        }
        updateSalon().then(() => {
          history.push("/sp-home");
        });
      })
      .catch((error) => {
        setClickedOnSubmit(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          // alert("please enter valid password");
          maincontext.setNotify({
            message: "please enter valid password",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          // alert("please enter valid Username");
          maincontext.setNotify({
            message: "please enter valid Username",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
          // alert(errorMessage);
        } else {
          maincontext.setNotify({
            message: errorMessage,
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
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
        <h2>Log in as Service Provider</h2>
        <form className="registration_form">
          <div className="labelandinput">
            <label>Username</label>
            <input
              name="salonUsername"
              value={providercontext.sp?.salonUsername}
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
              value={providercontext.sp?.salonPassword}
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
