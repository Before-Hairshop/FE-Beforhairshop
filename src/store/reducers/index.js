import { combineReducers } from "redux";
import Sample from "./sample_reducer";
import Profile from "./profile_reducer";

const rootReducer = combineReducers({
  Sample,
  Profile,
});

export default rootReducer;
