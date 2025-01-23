import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from '@mui/material/IconButton';

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  async function getLogin() {
    console.log("Issou");
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          username: login,
          password: password,
        }),
      });
      const data = await res.json();
      console.log("Button clicked, data : " + JSON.stringify(data));
    } catch (error) {
      console.log("Erreur == " + error);
    }
  }
  return (
    <div className="App">
      <div className="loginContainer">
        <div className="input-container">
          <h1>Login</h1>
          <div className="flexCol flexSpaceBetw gap30 padd5">
            <TextField id="filled-basic" label="Login" variant="filled" />
            <TextField id="filled-basic" label="Password" variant="filled">
              {" "}
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </TextField>
          </div>
          <button className="loginButton" onClick={getLogin}>
            Login
          </button>
          <div>
            <p>
              Forgot <a href="">Password</a> ?
            </p>
            <p>
              Don't you have an account ? <a href="">Sign up !</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
