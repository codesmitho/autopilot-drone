import React from 'react'

const AssignBox = () => {
  return (
    <div className="bg-[#f3f4f6] h-auto text-[#111111] rounded-xl p-5 mt-4">
      <div className="text-lg pb-2 border-b border-[#979797] font-medium">
        Assigned drone
      </div>
      <div className="mt-2">
        <div className="mb-1 pb-2 border-b border-[#dadada]">
          <div className="text-base font-medium">Scout drone</div>
          <div className="text-sm mt-1">Drone1 (100 m.)</div>
        </div>
        <div className="mb-1 pb-2 border-b border-[#dadada]">
          <div className="text-base font-medium">Navigation drone</div>
          <div className="text-sm mt-1">Drone2 (400 m.)</div>
        </div>
        <div className="mb-1 pb-2 border-b border-[#dadada]">
          <div className="text-base font-medium">Delivery drone</div>
          <div className="text-sm mt-1">Drone3 (500 m.)</div>
        </div>
      </div>
    </div>
  )
}

export default AssignBox