import { SET_MOVIE, CLEAR_MOVIE, MOVIE_ERROR, LOADING_MOVIE } from '../types';

const initialState = {
	movieData: null,
	loading: false,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOADING_MOVIE:
			return {
				...state,
				loading: true,
			};
		case SET_MOVIE:
			return {
				...state,
				loading: false,
				errors: false,
				movieData: payload,
			};
		case MOVIE_ERROR:
			return {
				...state,
				loading: false,
				errors: true,
				movieData: null,
			};
		case CLEAR_MOVIE:
			return {
				...state,
				loading: false,
				errors: false,
				movieData: null,
			};
		default:
			return state;
	}
}
