import React from 'react'

const ButtonFilter = ({ label, icon, onClick }) => {
  return (
    <button
    onClick={onClick}
      className="flex items-center gap-2 text-[#111111] px-3 py-[6px] rounded-lg font-medium 
      border border-[#b6b6b6] hover:bg-[#f3f4f6] hover:border-[#979797] transition-all"
      title={label}
    >
      <img
        src={icon}
        alt={`${label} icon`}
        className="w-4 h-4"
      />
      <span>{label}</span>
    </button>
  )
}

export default ButtonFilter