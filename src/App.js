import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";



function App() {

  const clearToken = (e) => {
    // e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(false);
  }

  const [isToken, setIsToken] = useState("");

  return (
    <Router>
      <div className="App">
        <button className="button" onClick={clearToken}>Log Out</button>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/bubbles" component={BubblePage} setIsToken = {setIsToken}/>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute