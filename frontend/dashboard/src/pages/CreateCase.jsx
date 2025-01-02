import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import ButtonBk from "../components/ButtonBk";
import ButtonSearch from "../components/ButtonSearch";
import ButtonWh from "../components/ButtonWh";
import SupplyBox from "../components/Request/SupplyBox";

export const CreateCase = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    person_affected: 0,
    location: {
      latitude: "",
      longitude: "",
      address: "",
    },
    request_type: [],
  });

  const breadcrumbItems = [{ label: "Cases", link: "/cases" }, { label: "" }];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    // Add API integration or other handling logic here
  };

  return (
    <div className="bg-white">
      <div className="flex">
        <div className="w-32 px-4 border-r border-[#dadada]">
          <Navbar />
        </div>
        <div className="flex-1 mx-8 mt-9 mb-8 pt-1 px-4">
          <Breadcrumb items={breadcrumbItems} />
          <div className="text-2xl font-semibold mb-2">Create new case</div>
          <div className="border-b border-[#979797]"></div>

          <div className="w-full h-auto mt-3 mb-2">
            <div className="grid grid-cols-12 gap-5 h-full w-full">
              <section className="col-span-6">
                <form
                  onSubmit={handleSubmit}
                  className="h-[530px] border-b pt-1 pb-20 px-5 border-[#dadada] overflow-auto scrollbar-custom space-y-4"
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-[#111111]"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter case title, e.g., Car collision"
                      className="mt-1 block w-full p-2 border border-[#b6b6b6] rounded-md shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-[#111111]"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Provide a detailed description of the case"
                      className="mt-1 block w-full p-2 border border-[#b6b6b6] rounded-md shadow-sm"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="person_affected"
                      className="block text-sm font-medium text-[#111111]"
                    >
                      People affected
                    </label>
                    <input
                      type="number"
                      name="person_affected"
                      id="person_affected"
                      value={formData.person_affected}
                      onChange={handleChange}
                      placeholder="Enter number of people affected"
                      className="mt-1 block w-full p-2 border border-[#b6b6b6] rounded-md shadow-sm"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="request_type"
                      className="block text-sm font-medium text-[#111111]"
                    >
                      Request type
                    </label>
                    <div className="flex space-x-4 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prevData) => ({
                            ...prevData,
                            request_type: prevData.request_type.includes(
                              "Scout"
                            )
                              ? prevData.request_type.filter(
                                  (type) => type !== "Scout"
                                )
                              : [...prevData.request_type, "Scout"],
                          }))
                        }
                        className={`${
                          formData.request_type.includes("Scout")
                            ? "bg-[#009C10] text-white"
                            : "bg-[#f3f4f6]"
                        } px-3 py-1 rounded-xl`}
                      >
                        Scout
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prevData) => ({
                            ...prevData,
                            request_type: prevData.request_type.includes(
                              "Navigation"
                            )
                              ? prevData.request_type.filter(
                                  (type) => type !== "Navigation"
                                )
                              : [...prevData.request_type, "Navigation"],
                          }))
                        }
                        className={`${
                          formData.request_type.includes("Navigation")
                            ? "bg-[#1279C7] text-white"
                            : "bg-[#f3f4f6]"
                        } px-3 py-1 rounded-xl`}
                      >
                        Navigation
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prevData) => ({
                            ...prevData,
                            request_type: prevData.request_type.includes(
                              "Delivery"
                            )
                              ? prevData.request_type.filter(
                                  (type) => type !== "Delivery"
                                )
                              : [...prevData.request_type, "Delivery"],
                          }))
                        }
                        className={`${
                          formData.request_type.includes("Delivery")
                            ? "bg-[#E29922] text-white"
                            : "bg-[#f3f4f6]"
                        } px-3 py-1 rounded-xl`}
                      >
                        Delivery
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-[#111111]"
                    >
                      Incident location
                    </label>
                    <input
                      type="text"
                      name="location.address"
                      id="address"
                      value={formData.location.address}
                      onChange={handleChange}
                      placeholder="Search and select a location on the right to auto-fill this field."
                      className="mt-1 block w-full p-2 border border-[#b6b6b6] rounded-md shadow-sm"
                      required
                    />
                  </div>

                  {/* Show this div only if 'Delivery' is selected */}
                  {formData.request_type.includes("Delivery") && (
                    <div>
                      <label
                        htmlFor="supply"
                        className="block text-sm font-medium text-[#111111] mb-2"
                      >
                        Supply Selection
                      </label>
                      <SupplyBox padding="0"/> {/* SupplyBox component for searching supplies */}
                    </div>
                  )}

                  
                </form>
                <div className="float-right mt-3 flex items-center space-x-2">
                  <ButtonWh label="Back" />
                  <ButtonBk label="Create case" onClick={handleSubmit} />
                </div>
              </section>
              <section className="col-span-6 mt-7">
                <ButtonSearch placeHolder="Search location or landmark" />
                <div className="mt-3 bg-[#f3f4f6] h-[500px] rounded-lg"></div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCase;
