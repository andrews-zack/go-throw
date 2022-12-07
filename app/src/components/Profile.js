import React from "react"
import { useGlobalState } from "../context/GlobalState"
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";


const Profile = ({ users }) => {
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
            <div className="px-3 py-2 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <img className="mb-4" onClick={()=>navigate("/")} src={require("../assets/basket-logo.png")} alt="" width="60" height="60"/>
                    </div>
                </div>
            </div>
            <h1>{users.username}</h1>
            <div className="col-6 d-flex justify-content-center">
                <button onClick={() => handleLogout()} className="btn btn-light btn-outline-dark">Logout</button>
            </div> 
        </div>
    )
}

export default Profile