import { useState } from "react"

const ForgottenPassword = () => {
    const [logs, setLogs] = useState({
        login: "",
        password: "",
    });

    return(
        <div className="App">
        <div className="loginContainer">
            <h1>Login</h1>
            <input name="loginInput" placeholder="Login"/>
            <button className="loginButton">Login</button>

        </div>
        </div>
    );
}

export default ForgottenPassword;