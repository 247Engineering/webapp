import React from 'react'

const TableLayout = ({ children }: any) => {
  return (
    <div className="overflow-x-auto mr-[-1rem] text-black">
      <table className="w-full table-fixed">{children}</table>
    </div>
  )
}

export default TableLayout
