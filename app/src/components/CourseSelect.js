import { useState, useEffect } from 'react';
import axios from 'axios';
import haversine from 'haversine-distance'
import { useNavigate } from "react-router-dom";
import { useGlobalState } from '../context/GlobalState';
import { API_URL } from '../services/auth.constants';


function CourseSelect({ setSelectedCourse, postRound }) {

    const [courses, setCourses] = useState([]);
    const [state, dispatch] = useGlobalState();

    useEffect(() => {
        axios.get(`${API_URL}courses/`)
            .then((resp) => setCourses(resp.data));
    }, [])

    let navigate = useNavigate();

    let a = navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        a = { latitude: latitude, longitude: longitude }
        console.log(a)
    })

    // if (!a) {
    //     return <span>Loading...</span>
    // }

    function geoLocate() {
        for (let i = 0; i < courses.length; i++) {
            let b = { latitude: courses[i].course_lat, longitude: courses[i].course_long }
            courses[i] = {
                ...courses[i],
                distance: ((haversine(a, b)) * 0.00062137).toFixed(2),
            }
        }
        courses.sort(function (a, b) {
            return parseFloat(a.distance) - parseFloat(b.distance)
        })
        setCourses([...courses])
    }

    let courseItems = courses.map((item) =>
        <div key={item.id} className="col-sm-6 col-lg-6 py-1">
            <div className="card border border-dark h-100">
                <div
                    onClick={() => {
                        setSelectedCourse(courses.filter(course => course.id === item.id)[0])
                        postRound(item.course_name)
                            .then(() => navigate('/hole'));
                    }}
                    className="card-body"
                >
                    <h5 className="card-title fs-2 fw-bold">{item.course_name}</h5>
                    <p className="card-text fs-4" style={{minHeight: '36px'}}>{item.distance && `${item.distance} miles away`}</p>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <button onClick={() => { geoLocate() }} className="btn btn-info">Do the thing</button>
            <div className="container mt-3 pt-3" id="cont">
                <div className="row">
                    {courseItems}
                </div>
            </div>
        </div>
    )
}


export default CourseSelect