import { combineReducers } from "redux";
import toDoList from "./toDoList";
const appReducer = combineReducers({ toDoList });
export default appReducer;
