import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Requests } from "./Requests";
import { Tasks } from "./Tasks";
import ButtonAdd from "../components/ButtonAdd";
import { Link } from "react-router-dom";

export const Cases = () => {
  const [activeTab, setActiveTab] = useState("Requests");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `?tab=${tab}`); // Update the URL without reloading
  };

  useEffect(() => {
    // Get the current tab from the URL on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get("tab") || "requests"; // Default to "requests" if no tab is set in the URL
    setActiveTab(tabFromUrl);
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="flex">
          <div className="w-32 px-4 border-r border-[#dadada]">
            <Navbar />
          </div>

          <div className="flex-1 mx-8 mt-9 mb-8 pt-1 px-4">
            <div className="text-2xl font-semibold">Cases</div>

            <div className="border-b border-[#979797]">
              <button
                className={`pb-1 pt-1 mr-10 font-medium ${
                  activeTab === "requests"
                    ? "border-b-2 border-black"
                    : "text-[#8e8e8e]"
                }`}
                onClick={() => handleTabClick("requests")}
                title="Requests"
              >
                Requests
              </button>

              <button
                className={`pb-1 pt-1 mr-10 font-medium ${
                  activeTab === "tasks"
                    ? "border-b-2 border-black"
                    : "text-[#8e8e8e]"
                }`}
                onClick={() => handleTabClick("tasks")}
                title="Tasks"
              >
                Tasks
              </button>
              <div className="fixed right-12 top-[60px]">
                <Link to="/cases/create">
                  <ButtonAdd label="Create case" />
                </Link>
              </div>
            </div>

            <div className="mt-3">
              {activeTab === "requests" && (
                <div>
                  <Requests />
                </div>
              )}
              {activeTab === "tasks" && (
                <div>
                  <Tasks />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
