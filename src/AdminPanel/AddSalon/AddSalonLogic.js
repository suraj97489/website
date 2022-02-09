import { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Maincontext from "./../../context/MainContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseproduction";

const auth = getAuth();

function AddSalonLogic() {
  const maincontext = useContext(Maincontext);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [message, setMessage] = useState();

  const defaultSalon = {
    address: "",

    salonName: "",

    salonPhoto: process.env.REACT_APP_TEMPORARY_SALON_PIC,

    shopOpen: true,

    website: "",

    id: "",

    mobile: "",

    salonCode: "",
    salonReport: [],
    popUpActivated: false,

    services: [{ name: "hair Cutting", charges: "10" }],

    serviceproviders: [
      {
        bookingOn: true,
        fname: "",
        id: "",
        lname: "",

        customerResponded: false,
        mobile: "",
        providerPhoto: process.env.REACT_APP_TEMPORARY_PROFILE_PIC,
        customers: [],
      },
    ],
  };
  const [addSalon, setAddSalon] = useState(defaultSalon);
  const [salonLoginData, setSalonLoginData] = useState({
    salonUsername: "",
    salonPassword: "",
  });

  function updateAddSalonValue(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name !== "salonUsername" && name !== "salonPassword") {
      setAddSalon({ ...addSalon, [name]: value });
      if (name === "salonCode") {
        setAlreadyExist(
          maincontext.allSalon.some(
            (salon) => salon.salonCode === value.toLowerCase()
          )
        );
        let removedSpaces = value.replace(/ /g, "");

        setAddSalon({ ...addSalon, [name]: removedSpaces.toLowerCase() });
      }
    } else {
      let removedSpaces = value.replace(/ /g, "");
      setSalonLoginData({
        ...salonLoginData,
        [name]: removedSpaces.toLowerCase(),
      });
    }
  }

  function updateAddProviderValue(e) {
    const name = e.target.name;
    const value = e.target.value;

    setAddSalon({
      ...addSalon,
      serviceproviders: [{ ...addSalon.serviceproviders[0], [name]: value }],
    });
  }

  function addSalonHandler(e) {
    createUserWithEmailAndPassword(
      auth,
      salonLoginData.salonUsername,
      salonLoginData.salonPassword
    )
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        setMessage("successfully signed Up!!");

        let firstprovider = addSalon.serviceproviders[0];

        let firstproviderId =
          addSalon.id +
          firstprovider.mobile +
          firstprovider.fname +
          firstprovider.lname;

        let date = new Date().toDateString();

        const updatedSalon = {
          ...addSalon,
          salonUsername: salonLoginData.salonUsername,
          serviceproviders: [
            {
              ...firstprovider,
              mobile: firstprovider.mobile,
              id: firstproviderId,
            },
          ],
          registeredAt: date,
          id: user.uid,
        };
        setDoc(doc(db, "salon", user.uid), updatedSalon)
          .then(() => {
            const credentialData = {
              salonUsername: salonLoginData.salonUsername,
              salonPassword: salonLoginData.salonPassword,
              salonCode: addSalon.salonCode,
            };

            setDoc(doc(db, "loginData", user.uid), credentialData)
              .then(() => {
                alert("added document successfully");
              })
              .catch((err) => alert(err));
            setSalonLoginData({ salonUsername: "", salonPassword: "" });
            setAddSalon(defaultSalon);
          })
          .catch((error) => setMessage("Login Problem :" + error.message));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          setMessage("Error:Username already in use.");
        } else {
          setMessage(errorMessage);
        }
        // ..
      });
    e.preventDefault();
  }

  const addSalonFormArray = [
    {
      label: "Salon Name",
      value: addSalon.salonName,
      name: "salonName",
      type: "text",
    },
    {
      label: "Salon Address",
      value: addSalon.address,
      name: "address",
      type: "text",
    },
    { label: "Mobile", value: addSalon.mobile, name: "mobile", type: "number" },
    {
      label: "Salon Code",
      value: addSalon.salonCode,
      name: "salonCode",
      type: "text",
    },
    {
      label: "Username",
      value: salonLoginData.salonUsername,
      name: "salonUsername",
      type: "text",
    },
    {
      label: "Password",
      value: salonLoginData.salonPassword,
      name: "salonPassword",
      type: "text",
    },
  ];

  return {
    addSalon,
    salonLoginData,
    addSalonFormArray,
    setButtonDisabled,
    updateAddSalonValue,
    alreadyExist,
    addSalonHandler,
    updateAddProviderValue,
    message,
    buttonDisabled,
  };
}

export default AddSalonLogic;
