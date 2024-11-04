import React, { useState } from 'react'
import { mapOptions } from '../utils/MapConfig'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
const Browse = () => {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey
  })

  const containerStyle = {
  width: '900px',
  height: '600px',
}

const [center , setCenter] = useState({
  lat: 25.562706,
  lng:  85.080677
})

  function locateME() {
    navigator.geolocation.getCurrentPosition((p) => {
      setCenter((pre) => {
        return {
          ...pre,
          lat: p.coords.latitude,
          lng : p.coords.longitude
        }
      })
    })
  }


  return isLoaded ? (
    <div className='w-full mx-auto flex justify-center relative'>
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
        <Marker position={center} />

        <button onClick={locateME} className='z-10 absolute bottom-10 left-1/2 px-4 py-2 bg-cyan-300 rounded-xl'>Locate me</button>
      </GoogleMap>

    </div>
  ) : (
    <></>
  )
}

export default Browse
