import React, { useState } from "react";
import { useSupabase } from "../../../../../useSupaBaseContext";

interface PageSwitcher {
  showCoreApp: () => void;
  changeSplit: () => void;
}

export default function SettingsPage({ showCoreApp, changeSplit }: PageSwitcher) {
  const { deleteSession } = useSupabase();
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    changeSplit();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const buttonStyle = {
    width: "200px",
    height: "50px",
    backgroundColor: "#FFFFFF",
    color: "Black",
    border: ".5px solid black",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const buttonHoverEffects = {
    onMouseOver: (e: React.MouseEvent<HTMLButtonElement>) =>
      (e.currentTarget.style.backgroundColor = "lightgrey"),
    onMouseOut: (e: React.MouseEvent<HTMLButtonElement>) =>
      (e.currentTarget.style.backgroundColor = "white"),
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) =>
      (e.currentTarget.style.transform = "scale(0.95)"),
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) =>
      (e.currentTarget.style.transform = "scale(1)"),
  };

  return (
      <>
        <header style={{borderBottom:"2px solid black", height:"10%", display:"flex", alignItems:"center", paddingLeft:"10px", fontSize:"30px", fontWeight:"bold"}}>
          Settings
        </header>
        <div style={{ height: "90%", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
          <button
            {...buttonHoverEffects}
            style={buttonStyle}
            onClick={showCoreApp}
          >
            Back
          </button>
          <button
            {...buttonHoverEffects}
            style={{ ...buttonStyle, marginTop: "10px", marginBottom: "10px" }}
            onClick={() => setShowModal(true)}
          >
            Change Split
          </button>
          <button
            {...buttonHoverEffects}
            style={buttonStyle}
            onClick={deleteSession}
          >
            Logout
          </button>
          

          {showModal && (
            <div style={overlayStyle}>
              <div style={modalStyle}>
                <p>Are you sure you want to change the split? This will not delete the data for associated exercises; you will just have to re-add them to the day.</p>
                <div style={buttonContainerStyle}>
                  <button
                    {...buttonHoverEffects}
                    style={buttonStyle}
                    onClick={handleConfirm}
                  >
                    Yes
                  </button>
                  <button
                    {...buttonHoverEffects}
                    style={buttonStyle}
                    onClick={handleCancel}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "300px",
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
};
