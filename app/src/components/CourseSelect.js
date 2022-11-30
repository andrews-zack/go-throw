import haversine from 'haversine-distance'


function CourseSelect(props) {

    let courseList = props.courses
    // let sortedCourse = {}
    console.log(props.courses)
    function geoLocate() {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            let a = {latitude: props.courses[0].course_lat, longitude: props.courses[0].course_long}
            let b = {latitude: latitude, longitude:longitude}
            console.log((haversine(a,b))*0.00062137)
            // for(let i=0; i<props.courses.length; i++) {
                
            // }
        })
    }

    let courseItems = courseList.map((item) =>
        <div className="col-sm-6 col-lg-6 py-1">
            <div className="card border border-dark h-100">
                <div className="card-body">
                    <h5 className="card-title fs-2 fw-bold">{item.course_name}</h5>
                    <p className="card-text fs-4">{`${item.holes } holes`}</p>
                </div>
            </div>
        </div>
    )

    return(
        <div>
            <button onClick={geoLocate} className="btn btn-info">Do the thing</button> 
            <div className="container mt-3 pt-3" id="cont">
                <div className="row">
                    {courseItems}
                </div>
            </div>
        </div>
    )
}


export default CourseSelect