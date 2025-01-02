import React from "react";

export default function DynamicTable({ columns, data, onRowClick }) {
  return (
    <div className="mt-3 border-t border-[#dadada] pt-4">
      <div className="max-h-[70vh] overflow-auto">
        <table className="min-w-full text-[#111111] ">
          {/* Table Header */}
          <thead className="bg-[#f3f4f6] sticky top-0 z-10">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`py-2 px-4 text-left font-medium ${
                    index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""
                  } ${
                    index === columns.length - 1
                      ? "rounded-tr-lg rounded-br-lg"
                      : ""
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b hover:bg-[#f3f4f6] cursor-pointer"
                  onClick={() => onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-3 px-4">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-[#8e8e8e]"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
