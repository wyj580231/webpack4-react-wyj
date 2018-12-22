import { combineReducers } from "redux";
import convertReducers from "../utils/convertReducer";
import convertSagas from "../utils/convertSaga";
import toDoList from "models/toDoList";
let models = [toDoList];
const rootSaga = convertSagas(models);
const appReducer = combineReducers(convertReducers(models));
export default appReducer;
export { rootSaga };
