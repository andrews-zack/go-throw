import MapSnip from "./MapSnip"
import { useState, useEffect } from "react"
import axios from "axios";
import { useGlobalState } from '../context/GlobalState';
import { API_URL } from "../services/auth.constants";

function Hole({ holes, users, rnd }) {
    const [ count, setCount ] = useState(0);
    const [ state, dispatch ] = useGlobalState();
    const [ num, setNum ] = useState(0);
    // const [ rnd, setRnd] = useState(0)
    const [ scoreData, setScore ] = useState({
        user: state.currentUser.user_id,
        rounds: rnd,
        hole: holes[0].hole_list[num].id,
        // "score": null
    })
    
    // if(!holes || holes == undefined) {
    //     return <span>Loading...</span>
    // }
    // console.log('birds arent real')

    // const scoreData = {
    //     user: state.currentUser.user_id,
    //     rounds: rnd,
    //     hole: holes[0].hole_list[num].id,
    // }

    useEffect(() => {
        for(let i=0; i<18; i++) {
            scoreData.hole+=1
                axios.post(`${API_URL}scores/`, scoreData).then((response) => {
                    console.log(response.status);
                    console.log(response.data);
                })
            }
        }, [])

    const handleChange = (key, value) => {
        console.log(rnd + ' inside')
        setScore({
            ...scoreData,
            [key]: value
        })
        axios.patch(`${API_URL}scores/`, scoreData).then((response) => {
            console.log(response.status);
            console.log(response.data)
        })
    }


    return(
        <div className="d-flexflex-column justify-content-center">
            <h3>{holes.course_name}</h3>
            <div className="container">
                <div className="row text-center">
                    <div className="col">Hole {holes[0].hole_list[count].hole_num}</div>
                    <div className="col">{holes[0].hole_list[count].length}ft</div>
                    <div className="col">Par {holes[0].hole_list[count].par}</div>
                </div>
            </div>
            <MapSnip map={holes} count={count}/>
            <div className="container">
                <div className="row">
                    <div className="col-8">{users.username}</div>
                    <div className="col-4">
                        <input type="score" onChange={(e) => handleChange("score", e.target.value)} className="form-control" placeholder="Score"/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button onClick={ () => setCount(count-1)} disabled={count===0 ? true: false} className="btn btn-outline-info">Previous Hole</button>
                    </div>
                    <div className="col justify-content-center">
                        <button onClick={ () => setCount(count+1)} disabled={count===17 ? true: false} className="btn btn-outline-info">Next Hole</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hole