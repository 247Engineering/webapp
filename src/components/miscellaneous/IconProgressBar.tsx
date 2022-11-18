import React from 'react'

import { IconProgressBarProps } from '../../types'

const IconProgressBar = ({
  step,
  totalSteps,
  images,
  subtext,
}: IconProgressBarProps) => {
  return (
    <div className="flex items-center justify-between relative">
      {images.map((image, i) => (
        <div key={i} className="flex flex-col items-center relative">
          <img src={image} alt="step" className="w-[2rem] h-[2rem] z-10" />
          {subtext ? (
            <span className="mt-1.5 text-[0.625rem] leading-[0.875rem] font-[700] absolute top-[100%] whitespace-nowrap">
              {subtext[i]}
            </span>
          ) : null}
        </div>
      ))}
      <div className="absolute w-full h-[0.25rem] bg-grey">
        <div
          className="h-full w-full bg-orange"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

export default IconProgressBar
