import axios from 'axios';
import {
	SET_MOVIES,
	MOVIES_ERROR,
	SET_MOVIE,
	CLEAR_MOVIE,
	MOVIE_ERROR,
	LOADING_MOVIE,
	SET_SEARCHED_MOVIES,
	CLEAR_SEARCHED_MOVIES,
	SEARCHED_MOVIES_ERROR,
	LOADING_SEARCHED_MOVIES,
} from '../types';

export const setPopularMovies = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/movie/popular');
		dispatch({
			type: SET_MOVIES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: MOVIES_ERROR,
			payload: { msg: err.response },
		});
	}
};

export const setMovie = (movie_id) => async (dispatch) => {
	try {
		dispatch({
			type: LOADING_MOVIE,
		});
		const res = await axios.get(`/api/movie/${movie_id}`);
		dispatch({
			type: SET_MOVIE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: MOVIE_ERROR,
			payload: { msg: err.response },
		});
	}
};

export const clearMovie = () => async (dispatch) => {
	dispatch({
		type: CLEAR_MOVIE,
	});
};

export const setSearchedMovie = (query) => async (dispatch) => {
	try {
		dispatch({
			type: LOADING_SEARCHED_MOVIES,
		});
		const res = await axios.get(`/api/movie/search/${query}`);
		dispatch({
			type: SET_SEARCHED_MOVIES,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: SEARCHED_MOVIES_ERROR,
			payload: { msg: err.response },
		});
	}
};

export const clearSearchedMovies = () => async (dispatch) => {
	dispatch({
		type: CLEAR_SEARCHED_MOVIES,
	});
};
