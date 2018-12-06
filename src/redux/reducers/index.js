import { combineReducers } from "redux";
import toDoList from "./toDoList";
import convertReducers from '../utils/convertReducer'
const appReducer = combineReducers(convertReducers([toDoList]));
export default appReducer;
