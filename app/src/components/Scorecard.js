import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../services/auth.constants';
import axios from 'axios';


function Scorecard({ data, rnd, users, id }) {
    const [score, setScore] = useState([])
    const [state, dispatch] = useGlobalState()
    let navigate = useNavigate();


    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${API_URL}scores/`);
            setScore(response.data);
        }
        getData();
    }, []);

    let scorecard = []

    scorecard = score.filter(item => item.rounds === rnd)

    let total_score = 0
    for (let i = 0; i < scorecard.length; i++) {
        total_score += scorecard[i].score
    }
    const user_score = total_score - data.course_par

    if (scorecard.length === 0) return null

    return (
        <div className="vh-100" id="bg">
            <div className="container mb-5 border border-top-0 border-info rounded-bottom" id="gray">
                <p className="fw-bold text-white" id="title">Scorecard</p>
            </div>
            <div className="container mt-5 pt-3 h-auto border border-info rounded d-flex align-items-center" id="gray">
                <table className="table table-bordered table-striped table-sm bg-white">
                    <thead>
                        <tr>
                            <th colSpan={4}>{data.course_name}</th>
                            <th colSpan={4}>{users.username}</th>
                            <th colSpan={1}>{user_score}</th>
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
                            <td>{scorecard[0].score}</td>
                            <td>{scorecard[1].score}</td>
                            <td>{scorecard[2].score}</td>
                            <td>{scorecard[3].score}</td>
                            <td>{scorecard[4].score}</td>
                            <td>{scorecard[5].score}</td>
                            <td>{scorecard[6].score}</td>
                            <td>{scorecard[7].score}</td>
                            <td>{scorecard[8].score}</td>
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
                            <td>{scorecard[9].score}</td>
                            <td>{scorecard[10].score}</td>
                            <td>{scorecard[11].score}</td>
                            <td>{scorecard[12].score}</td>
                            <td>{scorecard[13].score}</td>
                            <td>{scorecard[14].score}</td>
                            <td>{scorecard[15].score}</td>
                            <td>{scorecard[16].score}</td>
                            <td>{scorecard[17].score}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="container d-flex h-50 align-items-end">
                <div className="row vw-100 justify-content-between mb-2">
                    <div className="col-6 d-flex justify-content-start">
                        <button
                            onClick={() => { navigate('/') }}
                            className="btn btn-lg btn-outline-info" id="gray">
                            Home
                        </button>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button
                            onClick={() => navigate('/profile')}
                            className={id === 11 ? "d-none btn btn-lg btn-outline-info" : "btn btn-lg btn-outline-info"} id="gray">
                            Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Scorecard