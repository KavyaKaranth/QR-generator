import React, { useState, useEffect } from "react";
import $ from "jquery";


function QRGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generateQR = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      $(".form-control")
        .addClass("border border-danger")
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
      setTimeout(() => $(".form-control").removeClass("border border-danger"), 800);
      return;
    }
    
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      text
    )}&size=250x250`;
    setQrUrl(apiUrl);
    $("#loading-spinner").fadeIn(200);
$("#loading-spinner").fadeOut(300);

    $("#qr-img").hide().fadeIn(500);
    if (!text.trim()) {
  $(".form-control")
    .addClass("border border-danger")
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  setTimeout(() => $(".form-control").removeClass("border border-danger"), 800);
  return;
}

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
  useEffect(() => {
 
  $("input").on("focus", function () {
    $(this).css("box-shadow", "0 0 10px #007bff");
  });
  $("input").on("blur", function () {
    $(this).css("box-shadow", "none");
  });
}, []);


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
      <div
  id="loading-spinner"
  className="text-center my-3"
  style={{ display: "none" }}
>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>


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
