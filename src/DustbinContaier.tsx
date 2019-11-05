// 也可以写成 Contaier.jsx (DragDropContextProvider)
// import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from "react-dnd-html5-backend";
import Box from "./Box";
import Dustbin from "./Dustbin";
import React from "react";

export default class DustbinContaier extends React.Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <Dustbin />
          <Box />
        </div>
      </DragDropContextProvider>
    );
  }
}
