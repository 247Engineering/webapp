import React from 'react'
import GoogleMapReact from 'google-map-react'
import redDot from '../../assets/images/red-dot.svg'
import { MapProps } from '../../types'

const Marker = ({ lat, lng }: { lat: number; lng: number }) => (
  <img src={redDot} alt="marker" />
)

const Map = ({ center, lat, lng }: MapProps) => {
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY as string }}
        defaultCenter={center}
        defaultZoom={15}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </>
  )
}

export default Map
