// import { useMemo } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'


let center = {}
const options={
    disableDefaultUI: true,
    mapTypeId: 'satellite'
}

export default function MapSnip({map, count}) {
    const key = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY
    center = {lat: map.hole_list[count].hole_lat, lng: map.hole_list[count].hole_long}
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: key
    })
    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}


function Map() {
    return (
        <GoogleMap
            zoom={19}
            center={center}
            mapContainerClassName='map-container w-100'
            mapTypeControl={false}
            tilt={0}
            options={options}>
        </GoogleMap>
        )
}
