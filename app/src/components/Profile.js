import React from "react"
import { useGlobalState } from "../context/GlobalState"


const Profile = ({ id }) => {
    const [ state, dispatch ] = useGlobalState();


    return(
        <div>
            <h1>{id}</h1>
        </div>
    )
}

export default Profile