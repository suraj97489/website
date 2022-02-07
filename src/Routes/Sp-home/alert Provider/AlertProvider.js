import React, { useContext } from "react";
import ProviderContext from "./../../../context/ProviderContext";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: "40rem",
  //   height: "10rem",
  backgroundColor: "white",
  border: "2px solid #000",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "centre",
  justifyContent: "centre",
  position: "relative",
  fontSize: "2rem",
};
function AlertProvider(props) {
  const providercontext = useContext(ProviderContext);

  const updateAlertResponse = () => {
    props.function();
    providercontext.setAlertProvider(false);
  };

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={providercontext.alertProvider}
      onClose={providercontext.closeAlert}
      BackdropComponent={Backdrop}
    >
      <div style={style}>
        <p>{providercontext.alertMessage}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem",
          }}
        >
          <button
            onClick={updateAlertResponse}
            style={{ marginRight: "2rem", padding: "0.5rem 1rem" }}
          >
            {props.buttonText}
          </button>
          <button
            style={{ padding: "0.5rem 1rem" }}
            onClick={() => providercontext.setAlertProvider(false)}
          >
            cancel
          </button>
        </div>
      </div>
    </StyledModal>
  );
}

export default AlertProvider;
