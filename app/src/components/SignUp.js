import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";


const SignUp = () => {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        passwordConf: "",
        firstName: "",
        lastName: "",
        email: "",
    })

    const handleChange = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        AuthService.register(user)
        navigate('/profile')
    }



    return(
        <>
            <div className="d-flex align-items-center vh-100 text-center container">
                <main className="c-form w-100 mb-5 pb-5">
                    <img src={require("../assets/basket-logo.png")} alt="" width="72" height="72"/>
                    <form onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 fw-normal text-center mt-3">Welcome!</h1>
                        <div className="form-floating">
                            <input onChange={(e) => handleChange('username', e.target.value)} type="username" className="form-control" id="username" placeholder="Username"/>
                            <label htmlFor="floatingInput">Please enter a username</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => handleChange('password', e.target.value)} type="password" className="form-control" id="password" placeholder="Password"/>
                            <label htmlFor="floatingPassword">Please create a password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-info" type="submit">Sign up</button>
                    </form>
                </main>
            </div>
        </>
    )
}


export default SignUp