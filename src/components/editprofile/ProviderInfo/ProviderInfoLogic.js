import { useState, useContext } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db, storage } from "../../../firebaseproduction";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import Maincontext from "../../../context/MainContext";
import ProviderContext from "./../../../context/ProviderContext";

import { useDispatch, useSelector } from "react-redux";
import { updateSalon } from "../../../features/salonSlice";

function ProviderInfoLogic() {
  const dispatch = useDispatch();
  const maincontext = useContext(Maincontext);
  const providercontext = useContext(ProviderContext);
  const [showAddButton, setShowAddButton] = useState(false);

  const salon = useSelector((state) => state.salon.salon);

  const [file, setFile] = useState();

  const resetProvider = {
    fname: "",
    lname: "",
    id: "",
    mobile: "",
    customers: [],
    bookingOn: true,
    providerPhoto: process.env.REACT_APP_TEMPORARY_PROFILE_PIC,
  };
  const [provider, setProvider] = useState(resetProvider);

  function providerPhotoHandler(e) {
    e.preventDefault();
    const file = e.target[0].files[0];

    uploadfile(file);
  }

  function uploadfile(file) {
    if (!file) return;
    providercontext.setButtonDisabled(false);
    const storageRef = ref(
      storage,
      `/salonImages/${salon.id}/${provider.fname}-${provider.lname}-${provider.mobile}/${provider.id}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        providercontext.setPhotoUploadingProgress(progress);
      },
      (err) => setFile(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setProvider({ ...provider, providerPhoto: url });
          setFile();
        });
      }
    );
  }

  function changeprovider(e) {
    setProvider(() =>
      maincontext.serviceproviders.find((each) => each.id === e.target.id)
    );

    setShowAddButton(false);
    removeWhiteBackground();
    e.target.classList.add("ProviderInfo__active_provider");
  }

  function removeWhiteBackground() {
    let providersdiv = document.getElementsByClassName(
      "ProviderInfo__SideBar__ProviderDiv"
    );
    Array.from(providersdiv).forEach((elem) =>
      elem.classList.remove("ProviderInfo__active_provider")
    );
  }

  function addprovider() {
    setProvider(resetProvider);
    removeWhiteBackground();
    setShowAddButton(true);
  }

  function handlechanges(e) {
    let name = e.target.name;
    let value = e.target.value;
    setProvider({ ...provider, [name]: value });
    providercontext.setButtonDisabled(false);
  }

  function saveChanges() {
    providercontext.setButtonDisabled(true);
    if (showAddButton) {
      maincontext.serviceproviders.push({
        ...provider,

        id: provider.fname + provider.lname + salon.id + provider.mobile,
      });

      const docRef = doc(db, "salon", salon.id);
      const payLoad = {
        ...salon,
        serviceproviders: maincontext.serviceproviders,
      };
      setDoc(docRef, payLoad).then(() => {
        maincontext.setNotify({
          message: "Provider Added Successfully...!!",
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      });

      let providersdiv = document.getElementsByClassName(
        "ProviderInfo__SideBar__ProviderDiv"
      );
      let providerdivarray = Array.from(providersdiv);

      providerdivarray.forEach((elem) =>
        elem.classList.remove("ProviderInfo__active_provider")
      );

      setProvider(resetProvider);
      removeWhiteBackground();
      setShowAddButton(true);
    } else {
      let newprovidersArray = maincontext.serviceproviders.map((each) => {
        if (each.id === provider.id) {
          return provider;
        } else {
          return each;
        }
      });
      const docRef = doc(db, "salon", salon.id);
      const payLoad = {
        ...salon,
        serviceproviders: newprovidersArray,
      };
      setDoc(docRef, payLoad)
        .then(() => {
          maincontext.setNotify({
            message: "Provider Updated Successfully...!!",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        })
        .catch((err) =>
          maincontext.setNotify({
            message: err.message,
            style: {
              backgroundColor: "red",
              color: "white",
            },
          })
        );

      setShowAddButton(false);
    }
  }

  function deleteProvider() {
    let newproArray = salon.serviceproviders.filter(
      (each) => each.id !== provider.id
    );
    const salonpayLoad = {
      ...salon,
      serviceproviders: newproArray,
    };
    dispatch(updateSalon(salonpayLoad));

    const docRef = doc(db, "salon", salon.id);
    const payLoad = { ...salon, serviceproviders: newproArray };
    setDoc(docRef, payLoad).then(() =>
      maincontext.setNotify({
        message: "Provider deleted Successfully...!!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      })
    );

    setProvider(resetProvider);
    removeWhiteBackground();
    setShowAddButton(true);
  }
  return {
    setProvider,

    changeprovider,
    addprovider,
    provider,
    providerPhotoHandler,
    file,
    handlechanges,
    saveChanges,
    showAddButton,
    deleteProvider,
  };
}

export default ProviderInfoLogic;
