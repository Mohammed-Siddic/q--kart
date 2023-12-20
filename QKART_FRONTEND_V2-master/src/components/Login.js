import { PauseSharp } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   * 
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [isLoad, setIsLoad] = useState(false)
  const history = useHistory();

  const userFunc = (e) => {
    setUsername(e.target.value)
   }

  const passFunc = (e) => {
  setPass(e.target.value)
  }


   
  const login = async (formData) => {
    formData = ({username:username, password:pass})
    setIsLoad(true)
    if(validateInput(formData) !== false  ){
      try{
        let res = await axios.post(`${config.endpoint}/auth/login`, formData);
        if(res.status === 201){
          enqueueSnackbar("Logged in successfully", {variant: 'success'})
          setIsLoad(false)
          // console.log(res.data)
          persistLogin(res.data.token, res.data.username, res.data.balance)
          setUsername("")
          setPass("")
          history.push("/", { from: "login" })
        }
      }catch(error){
          enqueueSnackbar("Password is incorrect", {variant: 'warning'})
          setIsLoad(false)
      }
    }
  };
// login()
  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    data = {username:username, password:pass}
    if(data.username.length === 0){
      enqueueSnackbar('Username is a required field', {variant: 'warning'})
      setIsLoad(false)
      return false
    }
    if(data.password.length === 0){
      enqueueSnackbar('Password is a required field', {variant: 'warning'})
      setIsLoad(false)
      return false;
    }
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token)
    localStorage.setItem("username", username)
    localStorage.setItem("balance", balance)
  };
  // persistLogin()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2>Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            value={username}
            onChange={userFunc}
            fullWidth
          />
            <TextField
            id="password"
            label="Password"
            variant="outlined"
            title="password"
            name="password"
            type="password"
            value={pass}
            onChange={passFunc}
            fullWidth
          />
          {isLoad ?   (<CircularProgress />) : (<Button className="button" variant="contained" onClick={login}>
            LOGIN TO QKART
           </Button>)}
           <p className="secondary-action">
            Don't have an account?{" "}
            <Link to="/register" className="link">Register Now</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
