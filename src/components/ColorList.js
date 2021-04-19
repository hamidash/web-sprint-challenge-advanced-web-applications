import React, { useState } from "react";
import axios from "axios";
import Color from "./Color";
import EditMenu from "./EditMenu";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        const changedColor = colors.find((color) => color.id == res.data.id);
        const indexOfChangedColor = colors.indexOf(changedColor);

        const updatedColors = [...colors];
        updatedColors[indexOfChangedColor] = res.data;

        updateColors(updatedColors);
      })
      .catch((err) => console.error(err.response.data));
  };

  const deleteColor = (color) => {
    console.log(color);
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        //console.log(res);
        const deletedColor = colors.find((color) => color.id == res.data);
        const indexOfDeletedColor = colors.indexOf(deletedColor);
        const updatedColors = [...colors];
        if (indexOfDeletedColor > -1) {
          updatedColors.splice(indexOfDeletedColor, 1);
        }
        updateColors(updatedColors);
      })
      .catch((err) => console.error("BK: ", err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <Color
            key={color.id}
            editing={editing}
            color={color}
            editColor={editColor}
            deleteColor={deleteColor}
          />
        ))}
      </ul>
      {editing && (
        <EditMenu
          colorToEdit={colorToEdit}
          saveEdit={saveEdit}
          setColorToEdit={setColorToEdit}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.
