import React from 'react'
import { ProgressBarProps } from '../../types'

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  return (
    <>
      <div className="progress-bar mb-1">
        <div
          className="progress"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
      <p className="font-[700] leading-[1rem] text-[0.75rem]">
        {step} of {totalSteps} steps
      </p>
    </>
  )
}

export default ProgressBar
