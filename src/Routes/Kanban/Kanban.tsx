import { IState } from "../../interfaces";
import Kanban from "../../Kanban/Kanban";
import { connect } from "react-redux";

export default connect((state: IState) => ({stories: state.kanbanData}))(Kanban);