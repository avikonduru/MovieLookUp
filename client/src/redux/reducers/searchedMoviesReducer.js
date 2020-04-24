import {
	SET_SEARCHED_MOVIES,
	CLEAR_SEARCHED_MOVIES,
	SEARCHED_MOVIES_ERROR,
	LOADING_SEARCHED_MOVIES,
} from '../types';

const initialState = {
	searchedMovies: [],
	loading: false,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOADING_SEARCHED_MOVIES:
			return {
				...state,
				loading: true,
			};
		case SET_SEARCHED_MOVIES:
			return {
				...state,
				loading: false,
				errors: false,
				searchedMovies: payload,
			};
		case SEARCHED_MOVIES_ERROR:
			return {
				...state,
				loading: false,
				errors: true,
				searchedMovies: [],
			};
		case CLEAR_SEARCHED_MOVIES:
			return {
				...state,
				loading: false,
				errors: false,
				searchedMovies: [],
			};
		default:
			return state;
	}
}
