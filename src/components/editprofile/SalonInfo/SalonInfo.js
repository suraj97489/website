import React, { useContext, useEffect } from "react";

import "./SalonInfo.css";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { db, storage } from "../../../firebaseproduction.js";
import { doc, setDoc } from "@firebase/firestore";
import Maincontext from "../../../context/MainContext";
// import UserContext from "../../../context/UserContext";
import ProviderContext from "../../../context/ProviderContext";
import { Helmet } from "react-helmet-async";

function SalonInfo() {
  const maincontext = useContext(Maincontext);

  const providercontext = useContext(ProviderContext);

  const dataInfo = [
    {
      label: "Salon Name",
      inputName: "salonName",
      inputType: "text",
      value: maincontext.salon?.salonName,
    },
    {
      label: "Address",
      inputName: "address",
      inputType: "text",
      value: maincontext.salon?.address,
    },
    {
      label: "Mobile Number",
      inputName: "mobile",
      inputType: "number",
      value: maincontext.salon?.mobile,
    },
    // {
    //   label: "Salon Code",
    //   inputName: "salonCode",
    //   inputType: "text",
    //   value: maincontext.salon?.salonCode,
    // },
    {
      label: "Website",
      inputName: "website",
      inputType: "text",
      value: maincontext.salon?.website,
    },
  ];

  function salonPhotoHandler(e) {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadPhoto(file);
  }

  function uploadPhoto(file) {
    if (!file) return;
    providercontext.setButtonDisabled(false);
    const storageRef = ref(
      storage,
      `/salonImages/${maincontext.salon.id}/${maincontext.salon.id}`
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
      (err) => console.error(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          maincontext.setSalon({ ...maincontext.salon, salonPhoto: url });
        });
      }
    );
  }

  function dataHandle(e) {
    let name = e.target.name;
    let value = e.target.value;
    providercontext.setButtonDisabled(false);
    maincontext.setSalon(() => {
      return { ...maincontext.salon, [name]: value };
    });
  }

  function SalonInfoHandler() {
    providercontext.setButtonDisabled(true);

    const docRef = doc(db, "salon", maincontext.salon.id);

    const payLoad = maincontext.salon;

    setDoc(docRef, payLoad).then(() => {
      maincontext.setNotify({
        message: "Salon Updated Successfully...!!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    });
  }

  // const salonPopUpActivation = () => {
  //   maincontext.setSalon((salon) => {
  //     const docRef = doc(db, "salon", maincontext.salon.id);
  //     const payLoad = { ...salon, popUpActivated: !salon.popUpActivated };

  //     setDoc(docRef, payLoad).then(() => {
  //       alert(
  //         salon.popUpActivated
  //           ? "popup deactivated succfully!!"
  //           : "popup activated succeffully!!  booking list will affect by customer behavior"
  //       );
  //     });

  //     return { ...salon, popUpActivated: !salon.popUpActivated };
  //   });
  // };

  return (
    <>
      <div className="SalonInfo">
        <div className="SalonInfo__image__wrapper">
          <img
            width="100%"
            src={maincontext.salon?.salonPhoto}
            alt="salon pic"
            height="fit-content"
            title="salon pic"
            loading="eager"
          ></img>
        </div>

        <form onSubmit={salonPhotoHandler}>
          <input
            type="file"
            id="inputphoto"
            name="image-upload"
            accept="image/*"
          ></input>
          <p style={{ fontSize: "2rem", color: "orange" }}>
            {providercontext.photoUploadingProgress === 100
              ? "Uploaded Successfully"
              : providercontext.photoUploadingProgress === 0
              ? null
              : providercontext.photoUploadingProgress}
          </p>

          <button type="submit" className="SalonInfo__change__photo">
            change photo
          </button>
        </form>
        {dataInfo.map((data, i) => {
          return (
            <div className="SalonInfo__lAI_Div" key={i}>
              <label>{data.label}</label>
              <input
                name={data.inputName}
                type={data.inputType}
                onChange={(e) => {
                  dataHandle(e);
                }}
                value={data.value}
              ></input>
            </div>
          );
        })}

        <button
          onClick={SalonInfoHandler}
          style={{ width: "40%" }}
          className="SalonInfo__change__photo"
          disabled={
            providercontext.buttonDisabled ||
            maincontext.salon?.mobile.length !== 10
          }
        >
          Save Changes
        </button>

        {/* <div className="textAndSwitchWrapper">
          <div>
            <p style={{ color: "white" }}>
              ACTIVATE NOTIFICATIONS FOR CUSTOMERS
            </p>
            <p style={{ color: "red" }}>
              warning:Activation notifications can affect existing
              bookings(depends on customer behavior)
            </p>
          </div>
          <Switch
            defaultChecked={maincontext.salon?.popUpActivated}
            size="small"
            {...label}
            onClick={salonPopUpActivation}
            {...label}
            style={{ alignSelf: "center" }}
          />
        </div> */}
      </div>
    </>
  );
}

export default SalonInfo;
