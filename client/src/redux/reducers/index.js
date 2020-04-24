import { combineReducers } from 'redux';

// Reducers
import popularMovies from './popularMoviesReducer';
import movie from './movieReducer';
import searchedMovies from './searchedMoviesReducer';
import actor from './actorReducer';

export default combineReducers({ popularMovies, movie, searchedMovies, actor });
