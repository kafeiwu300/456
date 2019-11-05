// Box.jsx
import { DragSource, DragSourceSpec, DragSourceConnector } from "react-dnd";
import ItemTypes from "./ItemTypes";
import React from "react";
// Box.jsx
const sourceSpec: DragSourceSpec<any, { id: any; }> = {
  beginDrag(props, monitor, component){
    // 返回需要注入的属性
    return {
      id: props.id
    }
  },
  endDrag(props, monitor, component){
    // ..
  },
  canDrag(props, monitor){
    return true;
  },
  isDragging(props, monitor){
    return true;
  }
}

const collect = (
  connect: DragSourceConnector
) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
});

@DragSource(ItemTypes.BOX, sourceSpec, collect)
export default class Box extends React.Component {
  /* ... */
}
