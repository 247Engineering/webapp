import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import WarehouseProduct from './WarehouseProduct'

import { AppDispatch } from '../../../store'
import { generateSku } from '../../../store/features/product'

const AddWarehouseProduct = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(generateSku())
  }, [dispatch])

  return (
    <WarehouseProduct
      header="Add new product"
      subHeader="Add a new product to your inventory "
    />
  )
}

export default AddWarehouseProduct
