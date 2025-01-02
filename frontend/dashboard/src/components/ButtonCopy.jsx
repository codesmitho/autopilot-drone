import React from 'react'

const ButtonCopy = ({ label, onClick }) => {
  return (
    <button
      className="flex items-center bg-[#111111] px-[6px] py-[6px] rounded-lg
      border border-[#111111] hover:bg-[#2e2e2e] hover:border-[#2e2e2e] transition-all"
      onClick={onClick}
      title={label}
    >
      <img
        src="/image/copy.svg"
        alt={`${label} icon`}
        className="w-4 h-4"
      />
    </button>
  )
}

export default ButtonCopy