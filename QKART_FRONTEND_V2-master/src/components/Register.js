import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  

  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [confirmpass, setConfirmpass] = useState("")
  const [isLoad, setIsLoad] = useState(false)
  const history = useHistory();


   const userFunc = (e) => {
      setUsername(e.target.value)
   }

   const passFunc = (e) => {
    setPass(e.target.value)
 }

 const cpassFunc = (e) => {
  setConfirmpass(e.target.value)
}

 
    // console.log(`${config.endpoint}/auth/register`)
    // console.log(enqueueSnackbar)
      // const 
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * 
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *  
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    formData = ({username:username, password:pass})
    setIsLoad(true)
    if(validateInput(formData) !== false  ){
      try{
        let res = await axios.post(`${config.endpoint}/auth/register`, formData);
        if(res.status === 201){
          enqueueSnackbar("Success - registering a new user", {variant: 'success'})
          setUsername("")
          setPass("")
          setConfirmpass("")
          setIsLoad(false)
          history.push("/login", { from: "register" })
        }
      }catch(error){
        // console.log(error.response)
          enqueueSnackbar("Username is already taken", {variant:'warning'})
          setIsLoad(false)
      }
    }
  };
  


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    data = {username:username, password:pass, confirmPassword: confirmpass}
    if(data.username.length === 0){
      enqueueSnackbar('Username is a required field', {variant: 'warning'})
      setIsLoad(false)
      return false
    }
    if(data.username.length < 6){
      enqueueSnackbar('Username atleast have 6 characters', {variant: 'warning'})
      setIsLoad(false)
      return false;
    }
    if(data.password.length === 0){
      enqueueSnackbar('Password is a required field', {variant: 'warning'})
      setIsLoad(false)
      return false;
    }
    if( data.password.length < 6){
      enqueueSnackbar('Password is atleast have 6 characters', {variant: 'warning'})
      setIsLoad(false)
      return false;
    }
    if(data.password !== data.confirmPassword){
      enqueueSnackbar('Password do not match', {variant: 'error'})
      setIsLoad(false)
      return false;
    }
    return true;
  };


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content" >
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            value={username}
            name="username"
            onChange={userFunc}
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={passFunc}
            value={pass}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password" 
            value={confirmpass}
            onChange={cpassFunc}
            fullWidth
          />
           {isLoad ?   (<CircularProgress />) : (<Button className="button" variant="contained"  onClick={register}>
            Register Now
           </Button>)}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login" className="link">Login Here!</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
