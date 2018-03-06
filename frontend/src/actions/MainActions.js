import { SOME_ACTION_TYPE } from "@/constants/actionTypes";
import type { Action, Payload } from "@/types/MainTypes/Action";

// eslint-disable-next-line
export function someActionCreator(payload: Payload): Action {
	return {
		type: SOME_ACTION_TYPE,
		payload
	};
}
