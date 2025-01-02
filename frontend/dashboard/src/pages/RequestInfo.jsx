import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Timeline from "../components/Request/Timeline";
import ButtonSearch from "../components/ButtonSearch";
import ButtonBk from "../components/ButtonBk";
import ButtonWh from "../components/ButtonWh";
import { useLocation, Link } from "react-router-dom";

const RequestInfo = () => {
  const { state } = useLocation();
  const { rowData } = state || {};

  const breadcrumbItems = [
    { label: "Requests", link: "/cases?tab=requests" },
    { label: rowData.title },
  ];

  const [isActive, setIsActive] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [acceptDateTime, setAcceptDateTime] = useState(null);

  const handleAcceptCase = () => {
    setIsActive(true);
    setIsAccept(true);
    const currentDateTime = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    setAcceptDateTime(currentDateTime);
  };

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
              <Link to="/cases?tab=requests">
                <button
                  className="pb-2 pt-1 mr-10 font-medium border-b-2 border-black"
                  title="Requests"
                >
                  Requests
                </button>
              </Link>

              <Link to="/cases?tab=tasks">
                <button
                  className="pb-2 pt-1 mr-10 font-medium text-[#8e8e8e]"
                  title="Tasks"
                >
                  Tasks
                </button>
              </Link>
            </div>
            {/*////////////////////// for info //////////////////////////////////*/}
            <div className="mt-2 mb-3">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="w-full h-auto">
              <div className="grid grid-cols-12 gap-5 h-full w-full">
                <section className="col-span-6">
                  <div className="h-[500px] border-b pb-20 border-[#dadada] overflow-auto scrollbar-custom">
                    <Timeline data={rowData} status={isActive} time={acceptDateTime} />
                  </div>
                  <div className="float-right mt-3 flex items-center space-x-2">
                    <ButtonWh label="Decline case" />
                    {!isAccept && (
                      <ButtonBk
                        label="Accept case"
                        onClick={handleAcceptCase}
                      />
                    )}
                    {isAccept && <ButtonBk label="View task" />}
                  </div>
                </section>
                <section className="col-span-6">
                  <ButtonSearch placeHolder="Search location or landmark" />

                  {/*//////////////// map ///////////////////////////////////////*/}
                  <div className="mt-3 bg-[#f3f4f6] h-[500px] rounded-lg"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestInfo;
