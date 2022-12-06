import React, { useState } from "react"
import AuthService from "../services/auth.service";
import { useGlobalState } from "../context/GlobalState";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const LogIn = ({ handleClick }) => {
    let navigate = useNavigate();

    const [ state, dispatch ] = useGlobalState();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        AuthService
            .login(username, password)
            .then(async (resp) => {
                let data = jwtDecode(resp.access)
                await dispatch({
                    currentUserToken: resp.access,
                    currentUser: data
                })
                navigate('/profile')
            });
    }




    return(
        <div>
            <main className="c-form w-100 m-auto">
                <form onSubmit={handleLogin}>
                    <img className="mb-4" src={require("../assets/basket-logo.png")} alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 fw-normal">Please log in</h1>
                    <div className="form-floating">
                        <input onChange={(e) => setUsername(e.target.value)} required type="username" className="form-control" id="username" placeholder="Username"/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" required className="form-control" id="password" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
                </form>
            </main>
        </div>
    )
}


export default LogIn