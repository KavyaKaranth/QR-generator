import React, { useState } from "react";
import $ from "jquery";

function QRGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generateQR = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      text
    )}&size=250x250`;
    setQrUrl(apiUrl);
    $("#qr-img").hide().fadeIn(500);
  };

  const clearInput = () => {
    setText("");
    setQrUrl("");
  };

const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download QR:", error);
    }
  };

  return (
    <form onSubmit={generateQR} className="d-flex flex-column align-items-center">
      <input
        type="text"
        className="form-control text-center mb-4"
        placeholder="Enter text or URL..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          maxWidth: "400px",
          padding: "14px",
          fontSize: "16px",
          borderRadius: "10px",
        }}
      />

      {qrUrl && (
        <div className="mb-4">
          <img
            id="qr-img"
            src={qrUrl}
            alt="QR Code"
            className="img-fluid rounded shadow-sm"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
      )}

      <div className="d-flex gap-3 justify-content-center">
        <button
          type="button"
          onClick={clearInput}
          className="btn btn-outline-secondary px-4"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-dark px-4">
          Generate
        </button>
        
      </div>
      {qrUrl && (
            <button
              type="button"
              onClick={downloadQR}
              className="btn btn-success mt-3"
            >
              Download QR
            </button>
          )}
    </form>
  );
}

export default QRGenerator;
