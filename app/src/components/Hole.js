import MapSnip from "./MapSnip"
import { useState } from "react"

function Hole({ holes }) {
    console.log(holes)
    const [ count, setCount ] = useState(3)
    
    return(
        <div className="d-flexflex-column justify-content-center">
            <h3>{holes.course_name}</h3>
            <div className="container">
                <div className="row text-center">
                    <div className="col">Hole {holes.hole_list[count].hole_num}</div>
                    <div className="col">{holes.hole_list[count].length}ft</div>
                    <div className="col">Par {holes.hole_list[count].par}</div>
                </div>
            </div>
            <MapSnip map={holes} count={count}/>
            <div className="container">
                <div className="row">
                    <div className="col-8">Zack Andrews</div>
                    <div className="col-4">
                        <input type="score" className="form-control" placeholder="Score"/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button onClick={setCount(count-1)} className="btn btn-outline-info">Previous Hole</button>
                    </div>
                    <div className="col justify-content-center">
                        <button onClick={setCount(count+1)} className="btn btn-outline-info">Next Hole</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hole