// import { useMemo } from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'


const key = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY
const center = {lat: 37.98830, lng: -84.53274}

export default function MapSnip() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: key
    })
    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}


function Map() {
    return (
        <GoogleMap zoom = {19} center = {center} mapContainerClassName = 'map-container'>
        </GoogleMap>
        )
}
