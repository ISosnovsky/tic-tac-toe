// @flow
import { SOME_ACTION_TYPE } from "@/constants/actionTypes";
import type { State } from "@/types/MainTypes/State";
import type { Action } from "@/types/MainTypes/Action";

const initialState = {
	number: 2
};

export default function appReducer(state: State = initialState, action: Action): State {
	switch (action.type) {
		case SOME_ACTION_TYPE: {
			return {
				...state,
				number: action.number
			};
		}
		default:
			return state;
	}
}
