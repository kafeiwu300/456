import { connect } from "react-redux";
import { IState } from "../../interfaces";
import Bug from "../../components/Bug/Bug";

// redux
export default connect((state: IState) => ({ bugs: state.bugData }))(Bug);