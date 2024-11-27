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

  return (
    <>
      <button onClick={showCoreApp}>Back</button>
      <button onClick={deleteSession}>Logout</button>
      <button onClick={() => setShowModal(true)}>Change Split</button>

      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <p>Are you sure you want to change the split? This will not delete the data for associated exercises you will just have to readd them to the day.</p>
            <div style={buttonContainerStyle}>
              <button onClick={handleConfirm} style={buttonStyle}>
                Yes
              </button>
              <button onClick={handleCancel} style={buttonStyle}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
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

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  border: "none",
  backgroundColor: "#007BFF",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};
