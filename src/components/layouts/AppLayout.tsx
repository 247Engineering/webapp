import React from 'react'
import NavBar from '../navigation/NavBar'

const AppLayout = ({ children, alternate, full }: any) => {
  return (
    <div className="h-full">
      <NavBar alternate={alternate} full={full} />
      <main className={`pt-8 pb-12 px-4 ${full ? "h-full" : ""}`}>{children}</main>
    </div>
  )
}

export default AppLayout
