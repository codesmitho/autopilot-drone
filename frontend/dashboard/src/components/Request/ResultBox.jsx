import React, { useState } from "react";
import ButtonCopy from "../ButtonCopy";

const ResultBox = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleCopy = () => {
    // const locationText = `${data.location.latitude}, ${data.location.longitude}`;
    // navigator.clipboard
    //   .writeText(locationText)
    //   .then(() => {
    //     setAlertVisible(true);
    //     setTimeout(() => {
    //       setAlertVisible(false); // Hide alert after 3 seconds
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     alert("Failed to copy coordinates: " + error);
    //   });
  };

  return (
    <div className="bg-[#f3f4f6] h-auto text-[#111111] rounded-xl p-5 flex items-center">
      <div className="flex-shrink-0 ml-4">
        <img src="/image/qr.png" className="w-28" alt="QR code" />
      </div>

      <div className="ml-4 p-3 rounded-lg flex flex-col">
        <div className="">
          <div className="text-lg font-medium">
            Control Drone & Share location
          </div>
        </div>
        <div className="mt-2">
          <div className="text-sm">
            sharing real-time location updates for enhanced tracking and
            coordination.
          </div>
        </div>
        <div className="mt-2">
          <div className="text-sm font-medium flex items-center">
            <span className="mr-3">QR code URL</span>
            <ButtonCopy label="Copy Latitude, Longitude" onClick={handleCopy} />
          </div>
        </div>
      </div>

      {/* Custom alert */}
      {alertVisible && (
        <div className="fixed top-0 left-1/2 min-w-96 transform -translate-x-1/2 mt-4 pl-4 pr-6 py-2 bg-[#f3f4f6] text-[#111111] border-l-4 border-green-500 shadow-md">
          <div className="font-medium">Success!</div>
          <div className="text-sm">QR code URL copied to clipboard!</div>
        </div>
      )}
    </div>
    
  );
};

export default ResultBox;
