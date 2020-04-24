import { SET_ACTOR, CLEAR_ACTOR, ACTOR_ERROR, LOADING_ACTOR } from '../types';

const initialState = {
	actorData: null,
	loading: false,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOADING_ACTOR:
			return {
				...state,
				loading: true,
			};
		case SET_ACTOR:
			return {
				...state,
				loading: false,
				errors: false,
				actorData: payload,
			};
		case ACTOR_ERROR:
			return {
				...state,
				loading: false,
				errors: true,
				actorData: null,
			};
		case CLEAR_ACTOR:
			return {
				...state,
				loading: false,
				errors: false,
				actorData: null,
			};
		default:
			return state;
	}
}
