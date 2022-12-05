import React, { useState } from "react"
import AuthService from "../services/auth.service";


const SignUp = ({ handleClick }) => {
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
    }



    return(
        <div>
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleRegister}>
                    <img className="mb-4" src={require("../assets/basket-logo.png")} alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 fw-normal">Welcome!</h1>
                    <div className="form-floating">
                        <input onChange={(e) => handleChange('username', e.target.value)} type="username" className="form-control" id="username" placeholder="Username"/>
                        <label htmlFor="floatingInput">Please enter a username</label>
                    </div>
                    <div className="form-floating">
                        <input onChange={(e) => handleChange('password', e.target.value)} type="password" className="form-control" id="password" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Please create a password</label>
                    </div>
                    <button onClick={() => handleClick('Profile')} className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                </form>
            </main>
        </div>
    )
}


export default SignUp