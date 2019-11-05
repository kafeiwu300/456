// Dustbin.jsx
import {
  DropTarget,
  DropTargetSpec,
  DropTargetConnector
} from "react-dnd";
import ItemTypes from "./ItemTypes";
import React from "react";
// Dustbin.jsx
const targetSpec: DropTargetSpec<any> = {
  drop(props, monitor, component) {
    // ..
  },
  hover(props, monitor, component) {
    // ..
  },
  canDrop(props, monitor) {
    return true;
  }
};

const collect = (connect: DropTargetConnector)=>{
  connectDropTarget: connect.dropTarget(),
};
@DropTarget(ItemTypes.BOX, targetSpec, collect)
export default class Dustbin extends React.Component {
  /* ... */
}
