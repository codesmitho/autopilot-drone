import React from 'react'

const ButtonBk = ({ label, onClick }) => {
  return (
    <button
      className="flex items-center gap-2 bg-[#111111] text-white px-3 py-[6px] rounded-lg font-medium 
      border border-[#111111] hover:bg-[#2e2e2e] hover:border-[#2e2e2e] transition-all"
      onClick={onClick}
      title={label}
    >
      {label}
    </button>
  )
}

export default ButtonBk