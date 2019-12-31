import { connect } from "react-redux";
import { IState } from "../../interfaces";
import StoryMap from "../../components/StoryMap/StoryMap";

export default connect((state: IState) => ({ ...state.storyMapData }))(
  StoryMap
);