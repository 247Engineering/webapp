import React, { useState } from 'react'

import searchIcon from '../../../assets/images/input-search.svg'
import indomie from '../../../assets/images/indomie.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import ProductItem from '../../../components/miscellaneous/ProductItem'

const RetailerShop = () => {
  const [search, setSearch] = useState('')

  return (
    <>
      <AppLayout location="Victoria Island" cart search hideLogo hideName>
        <div className="relative mt-[-1.5rem] mb-10">
          <input
            className="w-full p-[0.625rem] pl-[2.25rem] flex items-center justify-center p text-black-100 rounded-[8px] border border-solid border-grey-light"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search"
            className="w-[0.911rem] h-[0.911rem] absolute top-[15px] left-[11.5px]"
          />
        </div>
        <section className="mr-[-1rem]">
          <ProductItem
            image={indomie}
            name="Indomie Chicken Hungry Man Size (200g)"
            minOrder={10}
            price={5000}
          />
        </section>
      </AppLayout>
    </>
  )
}

export default RetailerShop
