import React, { useEffect, useState } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(axiosWithAuth())
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        console.table(res.data);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMessage(err.response.data.error);
      });
  }, []);

  return (
    <div className="container">
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      {errorMessage ? <p> {errorMessage}</p> : ""}
    </div>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
