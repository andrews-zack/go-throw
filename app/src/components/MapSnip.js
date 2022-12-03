// import { useMemo } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'


let center = {}

export default function MapSnip({map}) {
    const key = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY
    center = {lat: map[1].hole_lat, lng: map[1].hole_long}
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: key
    })
    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}


function Map() {
    return (
        <GoogleMap zoom = {19} center = {center} mapContainerClassName = 'map-container'></GoogleMap>
        )
}
