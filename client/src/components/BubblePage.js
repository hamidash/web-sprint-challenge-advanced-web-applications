import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../api/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(()=>{
    axiosWithAuth()
    .get('/colors')
    .then(res => {
      console.log(res);
      setColorList(res.data);
    })
    .catch(err => {
      console.log(err.response);
      setErrorMessage(err.response.data.error)
    })
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      {errorMessage ? <p>{errorMessage}</p> : ""}
    </>
  );
};

export default BubblePage;
