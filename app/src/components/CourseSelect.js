import haversine from 'haversine-distance'
import { useNavigate } from "react-router-dom";


function CourseSelect({ courses, setCourses }) {

    let navigate = useNavigate();

    let a = navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        a = { latitude: latitude, longitude: longitude }
        console.log(a)
    })
    function geoLocate() {
        for (let i = 0; i < courses.length; i++) {
            let b = { latitude: courses[i].course_lat, longitude: courses[i].course_long }
            courses[i] = {
                name: `${courses[i].course_name}`,
                distance: ((haversine(a, b)) * 0.00062137).toFixed(2)
            }
        }
        courses.sort(function (a, b) {
            return parseFloat(a.distance) - parseFloat(b.distance)
        })
        setCourses([...courses])
    }

    const filterData = (e) => {
        let selectedCourse = e.target
        courses.filter(item => item.course_name === selectedCourse.name)
        setCourses([...courses])
        console.log(setCourses)
    }

    let courseItems = courses.map((item) =>
        <div className="col-sm-6 col-lg-6 py-1">
            <div className="card border border-dark h-100">
                <div onClick={() => {{navigate('/hole')};
                                    filterData();
                        }} className="card-body">
                    <h5 className="card-title fs-2 fw-bold">{item.name}</h5>
                    <p className="card-text fs-4">{`${item.distance} miles away`}</p>
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