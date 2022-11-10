import React, { useState, CSSProperties } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import MoonLoader from 'react-spinners/MoonLoader'

import caution from '../../assets/images/caution.svg'
import locationIcon from '../../assets/images/location.svg'

import { LocationInputProps } from '../../types'

const LocationInput = ({
  label,
  setLocation,
  placeholder,
  dropdown,
  setDropdown,
}: LocationInputProps) => {
  const override: CSSProperties = {
    borderColor: 'rgba(0, 0, 0, 0.6)',
    background: 'transparent',
  }

  const [address, setAddress] = useState('')
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleChange = (address: string) => {
    setAddress(address)
  }

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLocation({ latitude: latLng.lat, longitude: latLng.lng })
        setAddress(address)
      })
      .catch((error) => {
        setError(true)
        setErrorText(error)
      })
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <label className="label text-black">{label}</label>
          <div
            className="relative text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              onFocus={() => setDropdown(true)}
              {...getInputProps({
                placeholder: placeholder,
                className: `input location mt-2 text-ellipsis ${
                  error ? 'error' : ''
                }`,
              })}
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
                  suggestions?.map((suggestion, i) => (
                    <li
                      {...getSuggestionItemProps(suggestion, {
                        className:
                          'px-[0.75rem] py-[0.625rem] flex items-center hover:bg-orange-light focus:bg-orange-light p capitalize',
                      })}
                      key={i}
                    >
                      {suggestion.description}
                    </li>
                  ))
                )}
              </ul>
            ) : null}
            <img
              src={locationIcon}
              alt="location"
              className="absolute top-[0.7rem] right-[0.625rem]"
            />
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
      )}
    </PlacesAutocomplete>
  )
}

export default LocationInput
