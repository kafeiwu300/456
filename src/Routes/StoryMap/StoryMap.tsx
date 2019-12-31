import { connect } from "react-redux";
import { IState } from "../../interfaces";
import StoryMap from "../../StoryMap/StoryMap";

export default connect((state: IState) => ({ ...state.storyMapData }))(
  StoryMap
);