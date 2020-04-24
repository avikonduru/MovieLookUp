import { SET_MOVIES, MOVIES_ERROR } from '../types';

const initialState = {
	popularMovies: [],
	loading: true,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_MOVIES:
			return {
				...state,
				loading: false,
				errors: false,
				popularMovies: payload,
			};
		case MOVIES_ERROR:
			return {
				...state,
				loading: false,
				errors: true,
				popularMovies: [],
			};
		default:
			return state;
	}
}
