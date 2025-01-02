import React from "react";
import DetailsBox from "./DetailsBox";
import SupplyBox from "./SupplyBox";
import ResultBox from "./ResultBox";
import AssignBox from "./AssignBox";

const Timeline = ({ data, status, time }) => {
  let steps = [
    { label: "Details", isActive: true },
    { label: "Review", isActive: false },
    { label: "Result", isActive: false },
  ];

  if (data.request_type && data.request_type.includes("Delivery")) {
    steps.splice(1, 0, { label: "Supply selection", isActive: true });
  }
  if (status) {
    steps = steps.map((step) => ({
      ...step,
      isActive:
        step.label === "Review" || step.label === "Result"
          ? true
          : step.isActive,
    }));
  }

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <div key={index} className="flex w-full">
          {/* Circle and Line (10%) */}
          <div className="flex flex-col items-center w-[10%]">
            {/* Circle */}
            <div className="flex items-center space-x-2">
              <span
                className={`w-5 h-5 rounded-full ${
                  step.isActive
                    ? "bg-[#111111]"
                    : "border-[3px] border-[#dadada]"
                }`}
              ></span>
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-[2px] ${
                  step.isActive ? "h-full bg-[#111111]" : "h-12 bg-[#dadada]"
                }`}
              ></div>
            )}
          </div>

          {/* Label and Box */}
          <div className="w-[90%]">
            <p
              className={`text-sm font-medium ${
                step.isActive ? "text-[#111111]" : "text-[#8e8e8e]"
              }`}
            >
              {step.label}
            </p>
            <div className="mt-2 mb-4 mr-6">
              {step.isActive && step.label === "Details" && (
                <DetailsBox data={data} />
              )}
              {step.label === "Supply selection" && step.isActive && (
                <SupplyBox padding="5" />
              )}
              {step.label === "Review" && !step.isActive && (
                <p className="text-sm text-[#8e8e8e] mt-2">Pending ...</p>
              )}
              {step.label === "Review" && step.isActive && (
                <p className="text-sm text-[#111111] mt-2">
                  Verified by Akkarachai {time ? `on ${time}` : ""}
                </p>
              )}
              {step.isActive && step.label === "Result" && (
                <>
                  <ResultBox />
                  <AssignBox />
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
