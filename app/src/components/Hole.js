import MapSnip from "./MapSnip"
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { useGlobalState } from '../context/GlobalState';
import { API_URL } from "../services/auth.constants";
import { useNavigate } from "react-router-dom";

function Hole({ holes, users, rnd }) {
    const [state, dispatch] = useGlobalState();
    const [roundScores, setRoundScores] = useState([]);
    const [currentHole, setCurrentHole] = useState(0)

    let navigate = useNavigate();
    let inputRef = useRef();

    useEffect(() => {
        const postScores = (holes) => {
            const promises = holes.hole_list.map(async (hole) => {
                let score = {
                    user: state.currentUser.user_id,
                    rounds: rnd,
                    hole: hole.id,
                }
                let response = await axios.post(`${API_URL}scores/`, score)
                return {
                    id: response.data.id,
                    round: response.data.rounds,
                    hole: response.data.hole,
                    score: response.data.score,
                }
            });

            return Promise.all(promises);
        }

        postScores(holes)
            .then((scores) => {
                let sorted = scores
                    .sort((a, b) => {
                        return parseFloat(a.hole) - parseFloat(b.hole)
                    })
                setRoundScores(sorted)
            })
    }, [])


    const handleBlur = (key, e) => {
        let score = roundScores[currentHole];
        let newScore = {
            ...score,
            hole: holes.hole_list[currentHole].id,
            [key]: inputRef.current.value
        }

        axios.patch(`${API_URL}scores/${score.id}/`, newScore)
            .then((response) => {
                console.log(response.status);
                console.log(response.data)
                setRoundScores(() => {
                    return [
                        ...roundScores.slice(0, currentHole),
                        newScore,
                        ...roundScores.slice(currentHole + 1),
                    ]
                })
            })
    }

    useEffect(() => {
        if (roundScores.length > 0) {
            inputRef.current.value = roundScores[currentHole].score || ''
        }
    }, [currentHole])

    return (
        <div className="d-flexflex-column justify-content-center">
            <h3>{holes.course_name}</h3>
            <div className="container">
                <div className="row text-center">
                    <div className="col">Hole {holes.hole_list[currentHole].hole_num}</div>
                    <div className="col">{holes.hole_list[currentHole].length}ft</div>
                    <div className="col">Par {holes.hole_list[currentHole].par}</div>
                </div>
            </div>
            <MapSnip map={holes} count={currentHole} />
            <div className="container">
                <div className="row">
                    <div className="col-8">{users.username}</div>
                    <div className="col-4">
                        <input
                            ref={inputRef}
                            type="score"
                            onBlur={(e) => handleBlur("score", e)}
                            className="form-control"
                            placeholder="Score"
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button onClick={() => setCurrentHole(currentHole - 1)} disabled={currentHole === 0 ? true : false} className="btn btn-outline-info">Previous Hole</button>
                    </div>
                    <div className="col justify-content-center">
                        <button onClick={() => setCurrentHole(currentHole + 1)} disabled={currentHole === 17 ? true : false} className="btn btn-outline-info">Next Hole</button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button onClick={() => navigate('/scorecard')} className={currentHole===17 ? "btn btn-outline-info" : "d-none btn btn-outline-info"}>Finish Round</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hole