

function Homepage(props) {


    return(
        <div>
            <div className="container vh-100" style={{backgroundImage: "linear-gradient(to right, rgb(104, 104, 104), rgb(115, 115, 115)"}}>
                <div className="row flex-column justify-content-center align-items-center h-75">
                    <img src={require("../assets/go-throw-logo.png")} alt="logo" id="home-logo" style={{height: "200px", width: "400px"}}/>
                    <div className="col-6 d-flex justify-content-center pt-5 pb-2">
                        <button onClick={() => props.handleClick("LogIn")} className="btn btn-light btn-outline-dark" type="button">Log-in</button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                    <button className="btn btn-light btn-outline-dark" type="button">Sign-up</button>
                    </div>

                </div>
                <div className="row flex-column justify-content-start align-items-center h-25">
                    <div className="col-6 d-flex justify-content-center">
                        <button className="btn btn-light btn-outline-dark" type="button">Start a Round</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Homepage