import { useState } from "react";
import "./register.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const RegisterPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mail, setMail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [invalid, setInvalid] = useState("hidden");
  const [data, setData] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  //const sendRegisterReq = () => {};
  async function getLogin() {
    setInvalid("hidden");
    try {
      const res = await fetch("http://localhost:5000/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login,
          password: password,
          confirmPassword: confirmPassword,
          mail: mail,
        }),
      });
      await setData(res.json());
      if (!data || Object.keys(data).length === 0) setInvalid("visible");
      console.log("Button clicked, data : " + JSON.stringify(data));
    } catch (error) {
      console.log("Erreur == " + error);
    }
    console.log("success");
  }
  
  return (
    <div className="registerPage">
      <div className="registerContainer">
        <div className="input-container">
          <h1>Register</h1>
          <div className="flexCol flexSpaceBetw gap30 padd5">
            <TextField
              id="filled-basic"
              label="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              variant="filled"
            />
            <TextField
              id="filled-basic"
              label="Mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
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
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Confirm password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
          </div>
          <p style={{ visibility: invalid }}>Something went wrong</p>
          <button className="loginButton" onClick={getLogin}>
            Register
          </button>
          <div>
            <p>
              Forgot <a href="/login">Password</a> ?
            </p>
            <p>
              Already have an account ? <a href="/Login">Log in !</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
