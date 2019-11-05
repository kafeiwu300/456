// Contaier.jsx (DragDropContex)
// import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Box from "./Box";
import Dustbin from "./Dustbin";
import React from "react";

@DragDropContext(HTML5Backend)
export default class Contaier extends React.Component {
  render() {
    return (
      <div>
        <Dustbin />
        <Box />
      </div>
    );
  }
}
