import React from 'react'

const ButtonFilterDrone = ({ label, onClick, isActive, counts }) => {
  return (
    <button
      onClick={onClick}
      className={`w-60 px-3 py-[6px] rounded-lg text-sm font-medium border text-left ${
        isActive ? "border-[#111111] border-2 text-[#111111]" :
         "border-[#b6b6b6] text-[#8e8e8e] hover:bg-[#f3f4f6]"
      } transition-all`}
      title={label}
    >
      {label}
      <div className={`mt-1 text-base ${isActive ? "font-semibold" : ""}`}>
      {counts !== undefined && `${counts}`}
      </div>
    </button>
  )
}

export default ButtonFilterDrone