import React from "react";
import ButtonFilterTask from "../components/ButtonFilterTask";
import ButtonFilter from "../components/ButtonFilter";
import ButtonSearch from "../components/ButtonSearch";
import DynamicTable from "../components/DynamicTable";

export const Tasks = () => {
  const filtersTasks = [
    "All",
    "In progress",
    "Waited for queue",
    "Succeeded",
    "Failed",
  ];

  const columns = [
    {
      label: "Case Title",
      key: "title",
    },
    {
      label: "Support Request",
      key: "request_type",
    },
    {
      label: "Request Time",
      key: "create_at",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between mt-3">
        {filtersTasks.map((filter) => (
          <ButtonFilterTask
            key={filter}
            label={filter}
            className="flex-1 mx-1"
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex space-x-4">
          <ButtonFilter
            label="Date and month"
            icon="/image/calendar.svg"
            //   onClick={handleSortClick}
          />
          <ButtonFilter
            label="Drone"
            icon="/image/drones.svg"
            // onClick={handleSortClick}
          />
          <ButtonFilter
            label="More filters"
            icon="/image/filter.svg"
            //  onClick={handleSortClick}
          />
          <ButtonFilter
            label="Clear filters"
            icon="/image/clear_filter.svg"
            //  onClick={handleSortClick}
          />
        </div>
        <div className="float-right flex items-center space-x-4">
          <ButtonSearch
            //onSearchChange={handleSearchChange}
            width="300px"
            placeHolder="Search"
          />
          <ButtonFilter
            label="Sort"
            icon="/image/sort.svg"
            //onClick={handleSortClick}
          />
        </div>
      </div>

      {/* <DynamicTable
        columns={columns}
        data={filteredData}
        onRowClick={handleRowClick}
      /> */}
    </>
  );
};
