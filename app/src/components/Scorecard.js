import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalState';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../services/auth.constants';
import axios from 'axios';


function Scorecard({ data, rnd }) {
    const [ score, setScore ] = useState([])
    const [ state, dispatch ] = useGlobalState()

    let scorecard = []

    useEffect(() => {
    axios.get(`${API_URL}scores/`)
        .then((resp) => setScore(resp.data));
    }, [])
    
    scorecard = score.filter(item => item.rounds === rnd)
    // console.log(scorecard[0])
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
                        <th colSpan={5}>{state.currentUser.username}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
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
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
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
        )
}
export default Scorecard