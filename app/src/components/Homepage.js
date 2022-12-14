import { useGlobalState } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const [ state, dispatch ] = useGlobalState();
    let navigate = useNavigate();
    
    return(
        <div>
            <div className="container vh-100" id="bg">
                <div className="row flex-column justify-content-center align-items-center h-75">
                    <img src={require("../assets/go-throw-logo.png")} alt="logo" id="home-logo" style={{height: "200px", width: "400px"}}/>
                    <div className="col-6 d-flex justify-content-center pt-5 pb-2">
                        <button
                            onClick={() => {navigate('/login')}}
                            className={state.currentUser===null ? "btn btn-lg btn-outline-info" : "d-none btn btn-lg btn-outline-info"}>
                            Log-in
                        </button>
                        <button
                            onClick={() => {navigate('/profile')}}
                            className={state.currentUser===null ? "d-none btn btn-lg btn-outline-info" : "btn btn-lg btn-outline-info"}>
                            Profile
                        </button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <button
                            onClick={() => {navigate('/signup')}}
                            className={state.currentUser===null ? "btn btn-lg btn-outline-info" : "d-none btn btn-lg btn-outline-info"}>
                            Sign-up
                        </button>
                    </div>
                </div>
                <div className="row flex-column justify-content-start align-items-center h-25">
                    <div className="col-6 d-flex justify-content-center">
                        <button
                            onClick={() => {navigate('/courses')}}
                            className="btn btn-lg btn-outline-info">
                            Start a Round
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Homepage