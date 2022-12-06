// import { useMemo } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'


let center = {}

export default function MapSnip({map, count}) {
    console.log(map[0].hole_list[count])
    const key = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY
    center = {lat: map[0].hole_list[count].hole_lat, lng: map[0].hole_list[count].hole_long}
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
