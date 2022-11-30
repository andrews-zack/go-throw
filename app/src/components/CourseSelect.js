


function CourseSelect(props) {
    let courseList = props.courses
    let courseItems = courseList.map((item) =>
        <div className="col-sm-6 col-lg-6 py-1">
            <div className="card border border-dark h-100">
                <div className="card-body">
                    <h5 className="card-title fs-2 fw-bold">{item.course_name}</h5>
                    <p className="card-text fs-4">{item.holes}</p>
                </div>
            </div>
        </div>
    )

    return(
        <div className="container mt-3 pt-3" id="cont">
            <div className="row">
                {courseItems}
            </div>
        </div>
    )
}


export default CourseSelect