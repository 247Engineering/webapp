import React, { useMemo } from 'react'
import { OtpInputProps } from '../../types'

const regex = new RegExp(/^\d+$/)

const OtpInput = ({ value, onChange, className, disabled }: OtpInputProps) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split('')
    const items = []

    for (let i = 0; i < 4; i++) {
      const char = valueArray[i]

      if (regex.test(char)) {
        items.push(char)
      } else {
        items.push('')
      }
    }

    return items
  }, [value])

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null

    if (nextElementSibling) {
      nextElementSibling.focus()
    }
  }

  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null

    if (previousElementSibling) {
      previousElementSibling.focus()
    }
  }

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const target = e.target
    let targetValue = target.value.trim()
    const isTargetValueDigit = regex.test(targetValue)

    if (!isTargetValueDigit && targetValue !== '') {
      return
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return
    }

    targetValue = isTargetValueDigit ? targetValue : ' '

    const targetValueLength = targetValue.length

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, index) + targetValue + value.substring(index + 1)

      onChange(newValue)

      if (!isTargetValueDigit) {
        return
      }

      focusToNextInput(target)
    } else if (targetValueLength === 4) {
      onChange(targetValue)

      target.blur()
    }
  }

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    const target = e.target as HTMLInputElement

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault()
      return focusToNextInput(target)
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault()
      return focusToPrevInput(target)
    }

    const targetValue = target.value

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length)

    if (e.key !== 'Backspace' || target.value !== '') {
      return
    }

    focusToPrevInput(target)
  }

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e

    // keep focusing back until previous input
    // element has value
    const prevInputEl = target.previousElementSibling as HTMLInputElement | null

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus()
    }

    target.setSelectionRange(0, target.value.length)
  }

  return (
    <div className={`flex gap-x-4 ${className ? className : ''}`}>
      {valueItems.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={4}
          className="rounded-[4px] border border-[#B0B5C4] font-[700] text-[1.25rem] leading-[1.75rem] p-[0.625rem] flex justify-center items-center text-center w-[2.625rem]"
          value={digit}
          onChange={(e) => inputOnChange(e, index)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

export default OtpInput
