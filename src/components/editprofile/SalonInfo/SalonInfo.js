import React from "react";

import "./SalonInfo.css";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { db, storage } from "../../../firebaseproduction.js";
import { doc, setDoc } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { updateSalon } from "../../../features/salonSlice";
import { updateNotify } from "../../../features/mainSlice";
import {
  updatePhotoUploadingProgress,
  updateButtonDisabled,
} from "../../../features/providerSlice";

function SalonInfo() {
  const dispatch = useDispatch();

  const salon = useSelector((state) => state.salon.salon);
  const photoUploadingProgress = useSelector(
    (state) => state.providerstate.photoUploadingProgress
  );
  const buttonDisabled = useSelector(
    (state) => state.providerstate.buttonDisabled
  );
  const dataInfo = [
    {
      label: "Salon Name",
      inputName: "salonName",
      inputType: "text",
      value: salon?.salonName,
    },
    {
      label: "Address",
      inputName: "address",
      inputType: "text",
      value: salon?.address,
    },
    {
      label: "Mobile Number",
      inputName: "mobile",
      inputType: "number",
      value: salon?.mobile,
    },
    // {
    //   label: "Salon Code",
    //   inputName: "salonCode",
    //   inputType: "text",
    //   value: salon?.salonCode,
    // },
    {
      label: "Website",
      inputName: "website",
      inputType: "text",
      value: salon?.website,
    },
  ];

  function salonPhotoHandler(e) {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadPhoto(file);
  }

  function uploadPhoto(file) {
    if (!file) return;
    dispatch(updateButtonDisabled(false));
    const storageRef = ref(storage, `/salonImages/${salon.id}/${salon.id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        dispatch(updatePhotoUploadingProgress(progress));
      },
      (err) => console.error(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const salonPayLoad = { ...salon, salonPhoto: url };
          dispatch(updateSalon(salonPayLoad));
        });
      }
    );
  }

  function dataHandle(e) {
    let name = e.target.name;
    let value = e.target.value;
    dispatch(updateButtonDisabled(false));
    dispatch(updateSalon({ ...salon, [name]: value }));
  }

  function SalonInfoHandler() {
    dispatch(updateButtonDisabled(true));

    const docRef = doc(db, "salon", salon.id);

    const payLoad = salon;

    setDoc(docRef, payLoad).then(() => {
      dispatch(
        updateNotify({
          message: "Salon Updated Successfully...!!",
          style: {
            backgroundColor: "green",
            color: "white",
          },
        })
      );
    });
  }

  // const salonPopUpActivation = async() => {
  //   const docRef = doc(db, "salon", salon.id);
  //   const payLoad = { ...salon, popUpActivated: !salon.popUpActivated };

  //   setDoc(docRef, payLoad).then(() => {
  //     alert(
  //       salon.popUpActivated
  //         ? "popup deactivated succfully!!"
  //         : "popup activated succeffully!!  booking list will affect by customer behavior"
  //     );
  //   });
  //    dispatch(updateSalon( { ...salon, popUpActivated: !salon.popUpActivated }))
  // };

  return (
    <>
      <div className="SalonInfo">
        <div className="SalonInfo__image__wrapper">
          <img
            width="100%"
            src={salon?.salonPhoto}
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
            {photoUploadingProgress === 100
              ? "Uploaded Successfully"
              : photoUploadingProgress === 0
              ? null
              : photoUploadingProgress}
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
          disabled={buttonDisabled || salon?.mobile.length !== 10}
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
            defaultChecked={salon?.popUpActivated}
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
