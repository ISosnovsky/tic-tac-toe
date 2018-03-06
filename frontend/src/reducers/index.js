import { combineReducers } from "redux";

import appReducer from "./someReducer";

const reducers = {
	app: appReducer
};

export default combineReducers(reducers);
