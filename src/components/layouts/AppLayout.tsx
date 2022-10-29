import React from 'react'

import NavBar from '../navigation/NavBar'
import { AppLayoutProps } from '../../types'

const AppLayout = ({ children, alternate, full, onClose }: AppLayoutProps) => {
  return (
    <div className="h-full">
      <NavBar alternate={alternate} full={full} onClose={onClose} />
      <main className={`pt-8 pb-12 px-4 ${full ? 'h-full' : ''}`}>
        {children}
      </main>
    </div>
  )
}

export default AppLayout
