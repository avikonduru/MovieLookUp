import axios from 'axios';
import { SET_ACTOR, CLEAR_ACTOR, ACTOR_ERROR, LOADING_ACTOR } from '../types';

export const setActor = (actor_id) => async (dispatch) => {
	try {
		dispatch({
			type: LOADING_ACTOR,
		});
		const res = await axios.get(`/api/movie/actor/${actor_id}`);
		dispatch({
			type: SET_ACTOR,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ACTOR_ERROR,
			payload: { msg: err.response },
		});
	}
};

export const clearActor = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ACTOR,
	});
};
