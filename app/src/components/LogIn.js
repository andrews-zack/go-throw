


function LogIn() {


    return(
        <div>
            <main className="form-signin w-100 m-auto">
                <form>
                    <img className="mb-4" src={require("../assets/basket-logo.png")} alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 fw-normal">Please log in</h1>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
                </form>
            </main>
        </div>
    )
}


export default LogIn