import React, { useState } from "react";
import {axiosWithAuth} from "../api/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [isLoggin, setIsLogging] = useState(false);

  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const changeHandler = (e) => {
    e.preventDefault();
    const newLoginData = {
      ...loginData,
      [e.target.name]: e.target.value
    }
    setLoginData(newLoginData);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLogging(true);
    axiosWithAuth()
    .post("/login", loginData)
    .then(res => {
      console.log(res)
      setIsLogging(false);
      localStorage.setItem("token",res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => {
      console.log(err.response)
      setIsLogging(false);
      setLoginErrorMessage(err.response.data.error);
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form action="" className="form" onSubmit={submitHandler}>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={changeHandler}
            placeholder="Username"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </label>
        <button className='btn'> Login </button>
        {isLoggin ? <p>Logging you in .....</p> : <p> {loginErrorMessage} </p>  }
      </form>
    </>
  );
};

export default Login;
