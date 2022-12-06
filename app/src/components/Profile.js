import React from "react"
import { useGlobalState } from "../context/GlobalState"
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";


const Profile = () => {
    const [ state, dispatch ] = useGlobalState();
    console.log(state.currentUser)

    let navigate = useNavigate()
    const handleLogout = () => {
        AuthService
            .logout()
        navigate("/")
    }

    return(
        <div>
            <h1>{state.currentUser.user_id}</h1>
            <div className="col-6 d-flex justify-content-center">
                <button onClick={() => handleLogout()} className="btn btn-light btn-outline-dark">Logout</button>
            </div> 
        </div>
    )
}

export default Profile