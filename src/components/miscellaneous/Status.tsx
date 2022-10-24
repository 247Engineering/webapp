import React from 'react'
import { StatusProps } from '../../types'

const Status = ({ className, text }: StatusProps) => {
  return <span className={`status ${className ? className : ''}`}>{text}</span>
}

export default Status
