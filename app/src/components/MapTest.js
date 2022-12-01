// import { useMemo } from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'


const key = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY
console.log(key)
const center = {lat: 37.98832, lng: -84.53407}

export default function MapTest() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: key
    })
    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}


function Map() {
    return (
        <GoogleMap zoom = {19} center = {center} mapContainerClassName = 'map-container'>
        <MarkerF position={center} />
        </GoogleMap>
        )
}
