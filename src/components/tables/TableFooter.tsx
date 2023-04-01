import React from "react";

const TableFooter = ({ total }: { total: number }) => {
  return (
    <p className="mt-2 py-5 px-4 text-[0.75rem] leading-[1rem] text-black-100">
      Showing {total ? 1 : 0}-{total} of {total} items
    </p>
  );
};

export default TableFooter;
