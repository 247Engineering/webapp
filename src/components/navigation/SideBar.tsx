import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/24Seven2.svg'
import dashboard from '../../assets/images/dashboard-icon.svg'
import products from '../../assets/images/product-icon.svg'
import orders from '../../assets/images/orders-icon.svg'
import warehouses from '../../assets/images/warehouses-icon.svg'
import operations from '../../assets/images/operations-icon.svg'
import settings from '../../assets/images/settings-icon.svg'

import { useAuth } from '../../hooks/useAuth'
import { AuthContextType } from '../../types'
import * as ROUTES from '../../routes'

const SideBar = ({ show }: { show: boolean }) => {
  const { logout } = useAuth() as AuthContextType
  return (
    <aside
      className={`absolute z-50 h-full w-full max-w-[16.875rem] bg-[#461A53] p-4 text-white font-[700] text-[0.875rem] leading-[1.25rem] ease-in-out transition-all duration-300 ${
        show ? 'translate-x-0' : 'translate-x-[-16.875rem]'
      }`}
    >
      <img src={logo} alt="logo" className="mb-8" />
      <Link
        to={ROUTES.DISTRIBUTOR.DASHBOARD}
        className="px-2 py-3.5 flex flex-items"
      >
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          <img src={dashboard} alt="dashboard" />
        </div>
        <p>Dashboard</p>
      </Link>
      <Link
        to={ROUTES.DISTRIBUTOR.DASHBOARD}
        className="px-2 py-3.5 flex flex-items"
      >
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          <img src={products} alt="products" />
        </div>
        <p>Products</p>
      </Link>
      <Link
        to={ROUTES.DISTRIBUTOR.DASHBOARD}
        className="px-2 py-3.5 flex flex-items"
      >
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          <img src={orders} alt="orders" />
        </div>
        <p>Orders</p>
      </Link>
      <Link
        to={ROUTES.DISTRIBUTOR.WAREHOUSES}
        className="px-2 py-3.5 flex flex-items"
      >
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          <img src={warehouses} alt="warehouses" />
        </div>
        <p>Warehouses</p>
      </Link>
      <Link
        to={ROUTES.DISTRIBUTOR.DASHBOARD}
        className="px-2 py-3.5 flex flex-items"
      >
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          <img src={operations} alt="operations" />
        </div>
        <p>Operations</p>
      </Link>
      <Link
        to={ROUTES.DISTRIBUTOR.DASHBOARD}
        className="px-2 py-3.5 flex flex-items"
      >
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          <img src={settings} alt="settings" />
        </div>
        <p>Settings</p>
      </Link>
      <div className="px-2 py-3.5 flex flex-items" onClick={() => logout()}>
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          {/* <img src={settings} alt="settings" /> */}
        </div>
        <p>Logout</p>
      </div>
    </aside>
  )
}

export default SideBar
