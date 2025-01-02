import React, { useState } from "react";
import FeatureLabel from "../FeatureLabel";
import ButtonCopy from "../ButtonCopy";

const DetailsBox = ({ data }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleCopy = () => {
    const locationText = `${data.location.latitude}, ${data.location.longitude}`;
    navigator.clipboard
      .writeText(locationText)
      .then(() => {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false); // Hide alert after 3 seconds
        }, 2000);
      })
      .catch((error) => {
        alert("Failed to copy coordinates: " + error);
      });
  };

  return (
    <div className="bg-[#f3f4f6] h-auto text-[#111111] rounded-xl p-5">
      <div className="text-lg pb-2 border-b border-[#979797] font-medium">
        {data.title}
        <div className="float-right">
          <div className="flex flex-wrap gap-2">
            {data.request_type.map((type) => (
              <FeatureLabel key={type} label={type} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-1 pb-2 border-b border-[#dadada]">
          <div className="text-base font-medium">Description</div>
          <div className="text-sm mt-1">{data.description}</div>
        </div>
        <div className="mb-1 pb-2 border-b border-[#dadada]">
          <div className="text-base font-medium">Persons affected</div>
          <div className="text-sm mt-1">{data.person_affected}</div>
        </div>
        <div className="mb-1 pb-2 border-b border-[#dadada]">
          <div className="text-base font-medium">Incident location</div>
          <div className="text-sm mt-1 flex items-center">
            <span className="mr-3">
              {data.location.address} ({data.location.latitude},{" "}
              {data.location.longitude})
            </span>
            <ButtonCopy label="Copy Latitude, Longitude" onClick={handleCopy} />
          </div>
        </div>
      </div>

      {/* Custom alert */}
      {alertVisible && (
        <div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 pl-4 pr-6 py-2
         bg-white text-[#111111] border border-[#b6b6b6] rounded-md"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
            <img src="/image/success.svg" className="w-8" alt="QR code" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium">Success!</div>
              <div className="text-sm">
                Latitude, Longitude copied to clipboard!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBox;
