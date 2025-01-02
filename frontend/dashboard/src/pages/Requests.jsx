import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonFeatureFilter from "../components/Request/ButtonFeatureFilter";
import ButtonSearch from "../components/ButtonSearch";
import ButtonFilter from "../components/ButtonFilter";
import requestmockup from "../temp/requestMockup";
import FeatureLabel from "../components/FeatureLabel";
import DynamicTable from "../components/DynamicTable";

export const Requests = () => {
  const navigate = useNavigate();
  //////////////////////////////// for table //////////////////////////////
  const columns = [
    {
      label: "Case Title",
      key: "title",
    },
    {
      label: "Support Request",
      key: "request_type",
      render: (value) => (
        <div className="flex flex-wrap gap-2">
          {value.map((type) => (
            <FeatureLabel key={type} label={type} />
          ))}
        </div>
      ),
    },
    {
      label: "Request Time",
      key: "create_at",
      render: (value) =>
        new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
    },
  ];

  ///////////////////////////////// filter and sort ///////////////////////////////
  const filters = ["All", "Scout", "Navigation", "Delivery"];
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortDescending, setIsSortDescending] = useState(true);

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

  const handleSortClick = () => {
    setIsSortDescending(!isSortDescending);
  };

  const filteredData = [...requestmockup]
    .filter((item) =>
      activeFilters.includes("All")
        ? true
        : item.request_type.some((type) => activeFilters.includes(type))
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.create_at);
      const dateB = new Date(b.create_at);

      return isSortDescending ? dateB - dateA : dateA - dateB;
    });

  //////////////////////////////////// info request ////////////////////////
  const handleRowClick = (rowData) => {
    navigate(`/cases/requests/${rowData._id}`, { state: { rowData} });
  };

  return (
    <>
      <div className="flex items-center justify-between mt-3">
        <div className="flex space-x-4">
          {filters.map((filter) => (
            <ButtonFeatureFilter
              key={filter}
              label={filter}
              isActive={activeFilters.includes(filter)}
              onClick={() => handleFilterClick(filter)}
            />
          ))}
        </div>
        <div className="float-right flex items-center space-x-4">
          <ButtonSearch onSearchChange={handleSearchChange} width="300px" placeHolder="Search" />
          <ButtonFilter
            label="Sort"
            icon="/image/sort.svg"
            onClick={handleSortClick}
          />
        </div>
      </div>

      <DynamicTable
        columns={columns}
        data={filteredData}
        onRowClick={handleRowClick}
      />

      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-36 text-center text-[#111111]">
          <img
            src="/image/drones.svg"
            alt="No cases"
            className="w-32 h-32 mb-4 opacity-15"
          />
          <p className="font-medium">No cases found.</p>
          <p>Have a great day ahead!</p>
        </div>
      )}
    </>
  );
};
