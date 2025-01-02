import React, { useState } from "react";
import ButtonAdd from "../components/ButtonAdd";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ButtonSearch from "../components/ButtonSearch";
import ButtonFilterDrone from "../components/ButtonFilterDrone";
import DynamicTable from "../components/DynamicTable";
import droneData from "../temp/drones";

export const Drones = () => {
  const filtersDrones = [
    "All",
    "Active",
    "In progress",
    "Maintenance",
    "Inactive",
  ];

  const statusColorMapping = {
    Active: "text-[#009C10]",
    "In progress": "text-[#1279C7]",
    Maintenance: "text-[#E29922]",
    Inactive: "text-[#DA1212]",
  };

  const statusCounts = filtersDrones.reduce((acc, status) => {
    acc[status] =
      status === "All"
        ? droneData.length
        : droneData.filter((drone) => drone.status === status).length;
    return acc;
  }, {});

  const columns = [
    {
      label: "Serial No.",
      key: "image_url",
      render: (imageUrl, item) => {
        return (
          <div className="flex items-center space-x-4">
            <div
              className={`w-14 h-14 rounded-lg ${
                imageUrl ? "" : "bg-[#111111] p-2"
              } flex items-center justify-center`}
            >
              <img
                src={imageUrl || "/image/drones_hover.svg"}
                alt="Drone"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            {/* Display serial number (_id) */}
            <span>{item._id}</span>
          </div>
        );
      },
    },
    {
      label: "Station Location",
      key: "station_uuid",
    },
    {
      label: "Contact Station",
      key: "create_at",
    },
    {
      label: "Status",
      key: "status",
      render: (status) => (
        <span
          className={`${
            statusColorMapping[status] || "text-[#111111]"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      label: "",
      key: "actions",
      render: (item) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
        const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
        return (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="py-2 px-3 rounded-full hover:bg-[#e7e8ea]"
              title="More options"
            >
              <img
              src="/image/more_option.svg"
              />
            </button>
  
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                
                <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <img
                      src="/image/edit.svg"
                      alt="Edit"
                      className="w-4 h-4"
                    />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <img
                      src="/image/delete.svg" 
                      alt="Delete"
                      className="w-4 h-4"
                    />
                    <span>Delete</span>
                  </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const [activeFilters, setActiveFilters] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (filter) => {
    if (filter === "All") {
      setActiveFilters(["All"]);
    } else {
      setActiveFilters((prevFilters) => {
        // Remove "All" if another filter is selected
        const updatedFilters = prevFilters.includes("All")
          ? [filter]
          : prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter) // Deselect if already selected
          : [...prevFilters, filter]; // Add the new filter

        // If no filters remain after deselection, default to "All"
        return updatedFilters.length === 0 ? ["All"] : updatedFilters;
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const filteredData = droneData.filter((item) => {
    // Apply filters
    const matchesFilter =
      activeFilters.includes("All") || activeFilters.includes(item.status);

    const matchesSearch =
      searchQuery.trim() === "" || // If search is empty, include all items
      item.station_uuid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item._id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="bg-white">
        <div className="flex">
          <div className="w-32 px-4 border-r border-[#dadada]">
            <Navbar />
          </div>
          <div className="flex-1 mx-8 mt-9 mb-8 pt-1 px-4">
            <div className="mb-2">
              <span className="text-2xl font-semibold">Drones</span>
              <div className="float-right flex items-center space-x-4 -translate-y-[6px]">
                <ButtonSearch
                  onSearchChange={handleSearchChange}
                  width="300px"
                  placeHolder="Search serial no. or station"
                />
                <Link to="/cases/create">
                  <ButtonAdd label="Add drone" />
                </Link>
              </div>
            </div>

            <div className="border-b border-[#979797]"></div>

            <div className="flex items-center justify-between mt-3">
              {filtersDrones.map((filter) => (
                <ButtonFilterDrone
                  key={filter}
                  label={filter}
                  counts={statusCounts[filter]}
                  className="flex-1 mx-1"
                  isActive={activeFilters.includes(filter)}
                  onClick={() => handleFilterClick(filter)}
                />
              ))}
            </div>

            <DynamicTable
              columns={columns}
              data={filteredData}
              // onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
