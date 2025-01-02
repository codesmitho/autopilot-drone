import React, { useState } from 'react';

const SupplyBox = ({ padding }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Sample options for the dropdown
  const options = ['Water', 'Food', 'Medicine', 'Clothing', 'Tools'];

  // Filter options based on the search query
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option) => {
    setSearchQuery(option); // Select the option
    setIsDropdownVisible(false); // Close the dropdown
  };

  return (
    <div className={`bg-[#f3f4f6] h-auto text-[#111111] rounded-xl p-${ padding }`}>
      <div className="relative">
        {/* Search Input */}
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md border border-[#b6b6b6]"
          placeholder="Search for supplies"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={toggleDropdown} 
        />

        {/* Dropdown */}
        {isDropdownVisible && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-[#ccc] rounded-md shadow-lg z-10">
            <ul className="max-h-40 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-[#eaeaea] cursor-pointer"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No supply found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplyBox;
