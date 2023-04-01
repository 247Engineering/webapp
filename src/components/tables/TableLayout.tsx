import React from 'react'

const TableLayout = ({ children, className }: any) => {
  return (
    <div
      className={`overflow-x-auto overflow-visible mr-[-1rem] text-black ${
        className ? className : ''
      }`}
    >
      <table className="w-full table-fixed">{children}</table>
    </div>
  )
}

export default TableLayout
