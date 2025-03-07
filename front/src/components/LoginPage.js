import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalid, setInvalid] = useState("hidden");
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

 async function getLogin() {
    setInvalid("hidden");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      console.log("heya");
      const responseData = await res.json();

      if (!responseData || Object.keys(responseData).length === 0) {
          setInvalid("visible");
      }
      console.log("Connecté ! " + JSON.stringify(responseData));
      localStorage.setItem("isConnected", true);
      if (localStorage.getItem("isConnected")) {
        window.location.href = "/Dex";
        sessionStorage.setItem("user_id", responseData.message);
      }
  } catch (error) { 
      console.log("Error : " + error);
  }
}
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="input-container">
          <h1>Login</h1>
          <div className="flexCol flexSpaceBetw gap30 padd5">
            <TextField
              id="filled-basic"
              label="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              variant="filled"
            />
          <FormControl variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
          </div>
          <p style={{ visibility: invalid }}>Invalid credentials</p>
          <button className="loginButton" onClick={getLogin}>
            Login
          </button>
          <div>
            <p>
              Forgot <a href="/">Password</a> ?
            </p>
            <p>
              Don't you have an account ? <a href="/Register">Sign up !</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
