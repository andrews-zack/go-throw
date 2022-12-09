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
        <div className="d-flex vh-100 flex-column justify-content-center">
            <h2>{holes.course_name}</h2>
            <div className="container h-auto">
                <div className="row text-center py-2">
                    <div className="col fw-bold">Hole {holes.hole_list[currentHole].hole_num}</div>
                    <div className="col fw-bold">{holes.hole_list[currentHole].length}ft</div>
                    <div className="col fw-bold">Par {holes.hole_list[currentHole].par}</div>
                </div>
            </div>
            <div className="container h-auto">
                <MapSnip map={holes} count={currentHole} />
            </div>
            <div className="container h-auto py-3">
                <div className="row">
                    <div className="col-8 fw-bold fs-5">{users.username}</div>
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
            <div className="container d-flex h-25 align-items-end">
                <div className="row vw-100 justify-content-between mb-2">
                    <div className="col-6 d-flex justify-content-start">
                        <button 
                            onClick={() => setCurrentHole(currentHole - 1)}
                            disabled={currentHole === 0 ? true : false}
                            className="btn btn-lg btn-outline-info">
                            Previous Hole
                        </button>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button 
                            onClick={() => setCurrentHole(currentHole + 1)}
                            disabled={currentHole === 17 ? true : false}
                            className={currentHole===17 ? "d-none btn btn-lg btn-outline-info" : " btn btn-lg btn-outline-info"}>
                            Next Hole
                        </button>
                        <button 
                            onClick={() => navigate('/scorecard')}
                            className={currentHole===17 ? "btn btn-lg btn-outline-info" : "d-none btn btn-lg btn-outline-info"}>
                            Finish Round
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="container h-auto">
                <div className="row">
                    <div className="col">
                        <button onClick={() => navigate('/scorecard')} className={currentHole===17 ? "btn btn-outline-info" : "d-none btn btn-outline-info"}>Finish Round</button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Hole