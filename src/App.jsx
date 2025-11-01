import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import QRGenerator from "./components/QRGenerator";
import "./App.css";

function App() {
  useEffect(() => {
    $("#qr-card").hide().fadeIn(800);
  }, []);

  return (
    <div className="app-bg d-flex align-items-center justify-content-center vh-100">
      <div
        id="qr-card"
        className="card shadow-lg text-center position-relative p-5"
        style={{
          width: "700px",
          height: "600px",
          borderRadius: "24px",
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <h3 className="fw-semibold mb-4">QR Code Generator</h3>
        <QRGenerator />
      </div>
    </div>
  );
}

export default App;
