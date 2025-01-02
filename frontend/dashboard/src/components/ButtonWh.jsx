import React from 'react'

const ButtonWh = ({ label, onClick }) => {
  return (
    <button
      className="text-[#111111] px-3 py-[6px] min-w-20 rounded-lg font-medium 
      border border-[#b6b6b6] hover:bg-[#f3f4f6] hover:border-[#979797] transition-all"
      onClick={onClick}
      title={label}
    >
      {label}
    </button>
  )
}

export default ButtonWh