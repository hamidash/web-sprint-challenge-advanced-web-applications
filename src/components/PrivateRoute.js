import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;

//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in