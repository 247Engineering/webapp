import React, { useMemo } from 'react'
import arrow from '../../assets/images/arrow-right.svg'
import progressDone from '../../assets/images/progress-done.svg'
import progressStarted from '../../assets/images/progress-started.svg'
import progressNone from '../../assets/images/progress-none.svg'
import { AccountProgressStepProps } from '../../types'

const AccountProgressStep = ({
  title,
  text,
  onClick,
  progress,
}: AccountProgressStepProps) => {
  const progressImg = useMemo(() => {
    switch (progress) {
      case 'done':
        return progressDone
      case 'started':
        return progressStarted
      default:
        return progressNone
    }
  }, [progress])

  return (
    <div className="mt-4 progress-step flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={progressImg}
          alt="progress"
          className="mr-2 h-[1.5rem] w-[1.5rem]"
        />
        <div className="flex flex-col justify-between">
          <p className="font-[700] leading-[1.25rem] text-[0.875rem] mb-1">
            {title}
          </p>
          <p className="leading-[1rem] text-[0.75rem]">{text}</p>
        </div>
      </div>
      <img
        src={arrow}
        className="w-[0.714rem] h-[1.25rem]"
        alt="arrow"
        onClick={onClick}
      />
    </div>
  )
}

export default AccountProgressStep
