const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');

const THE_MOVIE_DATABASE_API_KEY = config.get('THE_MOVIE_DATABASE_API_KEY');

// @route   GET api/movie/popular
// @desc    Get a list of the most popular movies
// @access  Public
router.get('/popular', async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/popular?api_key=${THE_MOVIE_DATABASE_API_KEY}&language=en-US&page=1`
		);

		results = response.data.results.map(function (item) {
			body = {
				id: item['id'],
				title: item['title'],
				overview: item['overview'],
				poster_path: item['poster_path'],
			};
			return body;
		});

		res.json(results);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/movie/search/:search_term
// @desc    Get list of movies from search query
// @access  Public
router.get('/search/:search_term', async (req, res) => {
	const errors = validationResult(req);

	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=${THE_MOVIE_DATABASE_API_KEY}&language=en-US&query=${req.params.search_term}&page=1&include_adult=false`
		);

		results = response.data.results.map(function (item) {
			body = {
				id: item['id'],
				title: item['title'],
				overview: item['overview'],
				poster_path: item['poster_path'],
			};
			return body;
		});

		res.json(results);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/movie/:movie_id
// @desc    Get the details of a selected movie
// @access  Public
router.get('/:movie_id', async (req, res) => {
	try {
		const movieResponse = await axios.get(
			`https://api.themoviedb.org/3/movie/${req.params.movie_id}?api_key=${THE_MOVIE_DATABASE_API_KEY}&language=en-US`
		);

		const movieCastResponse = await axios.get(
			`https://api.themoviedb.org/3/movie/${req.params.movie_id}/credits?api_key=${THE_MOVIE_DATABASE_API_KEY}`
		);

		const editedCastResponse = movieCastResponse.data.cast.map(function (item) {
			body = {
				id: item['id'],
				name: item['name'],
				character: item['character'],
				profile_path: item['profile_path'],
			};
			return body;
		});

		const similarMovieResponse = await axios.get(
			`https://api.themoviedb.org/3/movie/${req.params.movie_id}/similar?api_key=${THE_MOVIE_DATABASE_API_KEY}&language=en-US&page=1`
		);

		const editedSimilarResponse = similarMovieResponse.data.results.map(
			function (item) {
				body = {
					id: item['id'],
					title: item['title'],
					poster_path: item['poster_path'],
				};
				return body;
			}
		);

		body = {
			movie: movieResponse.data,
			cast: editedCastResponse,
			similar: editedSimilarResponse,
		};

		res.json(body);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/movie/actor/actor_id
// @desc    Get information on selected actor
// @access  Public
router.get('/actor/:actor_id', async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/person/${req.params.actor_id}?api_key=${THE_MOVIE_DATABASE_API_KEY}&language=en-US`
		);

		results = response.data;

		res.json(results);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
