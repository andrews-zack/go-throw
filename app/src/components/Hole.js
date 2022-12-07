import MapSnip from "./MapSnip"
import { useState, useEffect } from "react"
import axios from "axios";
import { useGlobalState } from '../context/GlobalState';

function Hole({ holes, users }) {
    const [ count, setCount ] = useState(0);
    const [ state, dispatch ] = useGlobalState();
    const [ num, setNum ] = useState(0);
    const [ rnd, setRnd] = useState('')
    
    // if(!holes || holes == undefined) {
    //     return <span>Loading...</span>
    // }
    // console.log('birds arent real')

    console.log(rnd)
    
    const roundData = {
        "user": state.currentUser.user_id,
        "course": holes[0].name,
    }
    const scoreData = {
        "user": state.currentUser.user_id,
        "rounds": rnd,
        "hole": holes[0].hole_list[num].id,
    }
    useEffect(() => {
        setTimeout(() => {for(let i=0; i<18; i++) {
                axios.post("https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us78.gitpod.io/api/scores/", scoreData).then((response) => {
                    setNum(num+1)
                    console.log(response.status);
                    console.log(response.data);
                })
            }}, 1000)
    
        axios.post("https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us78.gitpod.io/api/rounds/", roundData).then((resp) => {
            console.log(resp.status);
            console.log(resp.data)
            setRnd(resp.data.id)
        })
    }, [])

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
                        <input type="score" className="form-control" placeholder="Score"/>
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