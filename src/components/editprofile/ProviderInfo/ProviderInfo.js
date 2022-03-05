import React, { useEffect } from "react";

import "./ProviderInfo.css";

import { Delete } from "@material-ui/icons";

import ProviderInfoLogic from "./ProviderInfoLogic";
import { useSelector } from "react-redux";

function ProviderInfo() {
  const serviceproviders = useSelector((state) => state.salon.serviceproviders);
  const photoUploadingProgress = useSelector(
    (state) => state.providerstate.photoUploadingProgress
  );
  const buttonDisabled = useSelector(
    (state) => state.providerstate.buttonDisabled
  );

  const {
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
  } = ProviderInfoLogic();

  useEffect(() => {
    let cancel = false;
    if (cancel) return;

    setProvider(() =>
      serviceproviders?.length > 0 ? serviceproviders[0] : null
    );
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <div className="ProviderInfo">
        <div className="ProviderInfo__SideBar">
          {serviceproviders?.map((provider, i) => (
            <div
              key={provider.id}
              id={provider.id}
              onClick={changeprovider}
              className={
                i === 0
                  ? "ProviderInfo__SideBar__ProviderDiv ProviderInfo__active_provider"
                  : "ProviderInfo__SideBar__ProviderDiv"
              }
            >
              {`${provider.fname} ${provider.lname}`}
            </div>
          ))}
          <button
            onClick={addprovider}
            className="ProviderInfo__addProviderButton"
          >
            add provider
          </button>
        </div>

        <div className="ProviderInfo__Right">
          <div className="ProviderInfo__ImageWrapper_div">
            <img
              src={
                provider.providerPhoto ||
                process.env.REACT_APP_TEMPORARY_PROFILE_PIC
              }
              alt="provider_photo"
              title="provider photo"
              loading="eager"
              width="10rem"
              height="10rem"
            ></img>
          </div>
          <p style={{ fontSize: "2rem", color: "orange" }}>
            {photoUploadingProgress === 100
              ? "Uploaded Successfully"
              : photoUploadingProgress === 0
              ? null
              : photoUploadingProgress}
          </p>
          <h2 style={{ color: "white" }}>{file}</h2>

          <form
            onSubmit={providerPhotoHandler}
            style={{
              // backgroundColor: "green",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <input
              type="file"
              id="inputphoto"
              name="image-upload"
              accept="image/*"
            ></input>

            <button
              type="submit"
              className="ProviderInfo__Right__ChangePhotoButton"
            >
              {/* <label htmlFor="image-upload" >  <AddPhotoAlternate/>  */}
              change photo
              {/* </label>  */}
            </button>
          </form>

          <div className="ProviderInfo__details">
            <div className="ProviderInfo__labelAndInput">
              <label>first Name : </label>
              <input
                type="text"
                name="fname"
                onChange={handlechanges}
                value={provider.fname}
              ></input>
            </div>
            <div className="ProviderInfo__labelAndInput">
              <label>Last Name :</label>
              <input
                name="lname"
                type="text"
                onChange={handlechanges}
                value={provider.lname}
              ></input>
            </div>
            <div className="ProviderInfo__labelAndInput">
              <label>Mobile :</label>
              <input
                type="number"
                name="mobile"
                onChange={handlechanges}
                value={provider.mobile}
              ></input>
            </div>

            {showAddButton ? (
              <button
                onClick={saveChanges}
                className="ProviderInfo__SaveChanges"
                style={{ margin: "2rem auto" }}
                disabled={
                  provider.fname === "" ||
                  provider.lname === "" ||
                  provider.mobile.length !== 10
                }
              >
                add provider
              </button>
            ) : (
              <div className="save_and_delete_div">
                <button
                  onClick={saveChanges}
                  className="ProviderInfo__SaveChanges"
                  disabled={buttonDisabled || provider.mobile.length !== 10}
                >
                  Save changes
                </button>
                {serviceproviders?.length > 1 && (
                  <button
                    onClick={deleteProvider}
                    className="ProviderInfo__SaveChanges"
                  >
                    <Delete className="deletIcon"></Delete>Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProviderInfo;
