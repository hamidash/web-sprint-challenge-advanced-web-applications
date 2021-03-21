import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isCredentialsCorrect, setIsCredetialsCorrect] = useState("");

  useEffect(() => {
    axios
      .delete(`http://localhost:5000/api/colors/1`, {
        headers: {
          authorization:
            "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98",
        },
      })
      .then((res) => {
        axios
          .get(`http://localhost:5000/api/colors`, {
            headers: {
              authorization: "",
            },
          })
          .then((res) => {
            console.log(res);
          });
        console.log(res);
      });
  });

  const changeHandler = (e) => {
    const newFomData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFomData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("login", formData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.payload);
        setFormData({
          username: "",
          password: "",
        });
        props.history.push("/bubbles");
      })
      .catch((err) => {
        setIsCredetialsCorrect(false);
        console.error("BK: Login error ", err.response.data);
        setFormData({
          username: "",
          password: "",
        });
      });
  };

  return (
    <>
      {/* <h1>
        Welcome to the Bubble App!
      </h1> */}
      <form action="" className="login-form" onSubmit={submitHandler}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </label>

        <button className="button-row">Login</button>
        {isCredentialsCorrect === false ? (
          <p>Username or Password not valid</p>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
