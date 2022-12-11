import React from "react"
import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalState"
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { API_URL } from '../services/auth.constants';
import axios from 'axios';


const Profile = ({ users }) => {
    const [ state, dispatch ] = useGlobalState();
    const [ scorecard, setScorecard] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}scores/`)
            .then((resp) => setScorecard(resp.data));
        }, [])

        let userScores = []
        userScores = scorecard.filter(item => item.user===state.currentUser.user_id)
        console.log(userScores)


    let navigate = useNavigate()
    const handleLogout = () => {
        AuthService
            .logout()
            setTimeout(() => {navigate('/')},500)
    }

    return(
        <div className="vh-100" id="bg">
            <div className="px-3 py-2 border border-top-0 border-info rounded-bottom" id="gray">
                <div className="container">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-start pt-1 pb-2">
                            <img className="" onClick={()=>setTimeout(() => {navigate('/')},500)} src={require("../assets/basket-logo.png")} alt="" width="60" height="60"/>
                        </div>
                        <div className="col-6 d-flex justify-content-end pt-1 pb-2">
                            <button onClick={() => handleLogout()} className="btn btn-lg btn-outline-info">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5 border border-info rounded" id="gray">
                <div className="row py-3">
                    <div className="col-6 d-flex justify-content-start">
                        <p className="fw-bold fs-1 text-white mb-0">{users.username}</p>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button onClick={() => navigate('/courses')} className="btn btn-lg btn-outline-info">Start a Round</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile