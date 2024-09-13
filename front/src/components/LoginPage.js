import { useState } from "react"

const LoginPage = () => {
    const [logs, setLogs] = useState({
        login: "",
        password: "",
    });

    return(
        <div className="App">
        <div className="loginContainer">
            <h1>Login</h1>
            <input name="loginInput" placeholder="Login"/>
            <input name="passwordInput" placeholder="Password" type="password"/>
            <button className="loginButton">Login</button>
            <div>
                <p>Forgot <a href="">Password</a> ?</p>
                <p>Don't you have an account ? <a href="">Sign up !</a></p>
            </div>
        </div>
        </div>
    );
}

export default LoginPage;