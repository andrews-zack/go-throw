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

    let navigate = useNavigate()
    const handleLogout = () => {
        AuthService
            .logout()
            setTimeout(() => {navigate('/')},500)
    }

    
    let userScores = []
    let renderedScores = []
    userScores = scorecard.filter(item => item.user===state.currentUser.user_id)
    // if (userScores.length===0) return null
    console.log(userScores)
    let i=0
    // while (i < userScores.length) {
        for (let j=0; j<((userScores.length)/18); j+=18) {
            renderedScores = userScores.map((item) =>
            <div>
                {/* <div className="container border border-top-0 border-info rounded-bottom" id="gray">
                    <p className="fw-bold text-white" id="title">Scorecard</p>
                </div> */}
                <div className="container mt-3 pt-3 h-auto border border-info rounded d-flex align-items-center" id="gray">
                    <table className="table table-bordered table-striped table-sm bg-white pt-3 overflow-auto">
                        <thead>
                            <tr>
                                <th colSpan={4}>Course</th>
                                <th colSpan={4}>{users.username}</th>
                                {/* <th colSpan={1}>{user_score}</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="fw-bold">1</td>
                                <td className="fw-bold">2</td>
                                <td className="fw-bold">3</td>
                                <td className="fw-bold">4</td>
                                <td className="fw-bold">5</td>
                                <td className="fw-bold">6</td>
                                <td className="fw-bold">7</td>
                                <td className="fw-bold">8</td>
                                <td className="fw-bold">9</td>
                            </tr>
                            <tr>
                                <td>{userScores[j].score}</td>
                                <td>{userScores[j+1].score}</td>
                                <td>{userScores[j+2].score}</td>
                                <td>{userScores[j+3].score}</td>
                                <td>{userScores[j+4].score}</td>
                                <td>{userScores[j+5].score}</td>
                                <td>{userScores[j+6].score}</td>
                                <td>{userScores[j+7].score}</td>
                                <td>{userScores[j+8].score}</td>
                            </tr>
                            <tr>
                                <td className="fw-bold">10</td>
                                <td className="fw-bold">11</td>
                                <td className="fw-bold">12</td>
                                <td className="fw-bold">13</td>
                                <td className="fw-bold">14</td>
                                <td className="fw-bold">15</td>
                                <td className="fw-bold">16</td>
                                <td className="fw-bold">17</td>
                                <td className="fw-bold">18</td>
                            </tr>
                            <tr>
                                <td>{userScores[j+9].score}</td>
                                <td>{userScores[j+10].score}</td>
                                <td>{userScores[j+11].score}</td>
                                <td>{userScores[j+12].score}</td>
                                <td>{userScores[j+13].score}</td>
                                <td>{userScores[j+14].score}</td>
                                <td>{userScores[j+15].score}</td>
                                <td>{userScores[j+16].score}</td>
                                <td>{userScores[j+17].score}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            )
            // }
            // i+=18
        }
        


    return(
        <div className="vh-100" id="bg">
            <div className="px-3 py-2 border border-top-0 border-info rounded-bottom" id="gray">
                <div className="container">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-start pt-1 pb-2">
                            <img className="" onClick={()=>navigate('/')} src={require("../assets/basket-logo.png")} alt="" width="60" height="60"/>
                        </div>
                        <div className="col-6 d-flex justify-content-end pt-1 pb-2">
                            <button onClick={() => handleLogout()} className="btn btn-lg btn-outline-info">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-3 border border-info rounded" id="gray">
                <div className="row py-3">
                    <div className="col-6 d-flex justify-content-start">
                        <p className="fw-bold fs-1 text-white mb-0">{users.username}</p>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button onClick={() => navigate('/courses')} className="btn btn-lg btn-outline-info">Start a Round</button>
                    </div>
                </div>
            </div>
            <div className="container h-75 border border-info rounded mt-3" id="gray">
                {renderedScores}
            </div>
        </div>
    )
}

export default Profile