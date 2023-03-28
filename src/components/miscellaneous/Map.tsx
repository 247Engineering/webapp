import React from 'react'
import GoogleMapReact from 'google-map-react'
import redDot from '../../assets/images/red-dot.svg'
import { MapProps } from '../../types'

const Marker = ({
  lat,
  lng,
  img,
}: {
  lat: number
  lng: number
  img?: string
}) => <img src={img || redDot} alt="marker" />

const Map = ({ center, lat, lng, markers }: MapProps) => {
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY as string }}
        defaultCenter={center}
        defaultZoom={10}
      >
        {markers?.map(({ lat, lng, img }) => (
          <Marker key={img} lat={lat} lng={lng} img={img} />
        ))}
      </GoogleMapReact>
    </>
  )
}

export default Map
