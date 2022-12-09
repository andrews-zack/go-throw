import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../services/auth.constants';
import axios from 'axios';


function Scorecard({ data, rnd, users }) {
    const [ score, setScore ] = useState([])
    const [ state, dispatch ] = useGlobalState()

    let scorecard = []

    useEffect(() => {
    axios.get(`${API_URL}scores/`)
        .then((resp) => setScore(resp.data));
    }, [])
    
    scorecard = score.filter(item => item.rounds === rnd)
    if (scorecard.length === 0) {
        return(
            <h1>Loading</h1>
        )
    }

    return(
        <div>
        <h1>Scorecard</h1>
            <table className="table table-bordered table-striped table-sm">
                <thead>
                    <tr>
                        <th colSpan={4}>{data.course_name}</th>
                        <th colSpan={4}>{users.username}</th>
                        <th colSpan={1}>-12</th>
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
            <div className="container d-flex h-100 align-items-end justify-content-end">

            </div>
        </div>
        )
}
export default Scorecard