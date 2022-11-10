import React, { useState, CSSProperties } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

import caution from '../../assets/images/caution.svg'
import placeholderImage from '../../assets/images/image.svg'
import add from '../../assets/images/add-sm.svg'

import { SearchSelectProps } from '../../types'

const SearchSelect = ({
  label,
  options,
  image,
  onChange,
  error,
  errorText,
  placeholder,
  addNew,
  itemImage,
  dropdown,
  setDropdown,
  onSearch,
  onBlur,
  loading,
}: SearchSelectProps) => {
  const override: CSSProperties = {
    borderColor: 'rgba(0, 0, 0, 0.6)',
    background: 'transparent',
  }

  const [text, setText] = useState('')

  const handleChange = (option: any) => {
    setText(option.label)
    setDropdown(false)
    onChange(option)
  }

  return (
    <>
      <label className="label text-black">{label}</label>
      <div className="relative text-black" onClick={(e) => e.stopPropagation()}>
        <input
          className={`input mt-2 ${error ? 'error' : ''} capitalize`}
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            if (e.target.value) {
              onSearch!(e.target.value)
            } else {
              onBlur()
            }
          }}
          placeholder={placeholder}
          onFocus={() => setDropdown(true)}
        />
        {dropdown ? (
          <ul className="rounded-[8px] shadow-sm py-2 max-h-[13.5rem] overflow-y-auto text-ellipsis">
            {loading ? (
              <li className="px-[0.75rem] py-[0.625rem] flex items-center justify-center">
                <MoonLoader
                  cssOverride={override}
                  size={18.7}
                  color="rgba(0, 0, 0, 0.6)"
                />
              </li>
            ) : (
              <>
                {addNew ? (
                  <li
                    className="px-[0.75rem] py-[0.625rem] flex items-center hover:bg-orange-light focus:bg-orange-light p capitalize"
                    onClick={() => handleChange({ label: text, value: text })}
                  >
                    <>
                      <img
                        src={add}
                        className="rounded-full w-[1.016rem] h-[1.016rem] mr-[0.7rem]"
                        alt="product"
                      />
                      Add {text}
                    </>
                  </li>
                ) : null}
                {options?.map((option, i) => (
                  <li
                    key={i}
                    className="px-[0.75rem] py-[0.625rem] flex items-center hover:bg-orange-light focus:bg-orange-light p capitalize"
                    onClick={() => handleChange(option)}
                  >
                    <>
                      {itemImage ? (
                        <img
                          src={option.image || placeholderImage}
                          className="rounded-full w-[1.25rem] h-[1.25rem] mr-2"
                          alt="product"
                        />
                      ) : (
                        ''
                      )}
                      {option.label}
                    </>
                  </li>
                ))}
              </>
            )}
          </ul>
        ) : null}
        {image ? (
          <img
            src={image}
            alt="icon"
            className="absolute top-[0.7rem] right-[0.625rem]"
          />
        ) : null}
        {error ? (
          <span className="mt-2 text-[0.75rem] leading-[1rem] flex items-center text-black-100">
            <img
              className="w-[0.917rem] h-[0.792rem] mr-[0.542rem]"
              alt="error"
              src={caution}
            />
            {errorText}
          </span>
        ) : null}
      </div>
    </>
  )
}

export default SearchSelect
