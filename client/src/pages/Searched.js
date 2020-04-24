import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
	setSearchedMovie,
	clearSearchedMovies,
} from '../redux/actions/moviesAction';

//Components
import MovieCard from '../components/MovieCard';

//Material UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	cardStyles: {
		flex: 1,
	},
}));

const Searched = ({
	match,
	setSearchedMovie,
	clearSearchedMovies,
	searchedMovies,
	loading,
}) => {
	useEffect(() => {
		setSearchedMovie(match.params.id);
		window.scrollTo(0, 0);

		return () => {
			clearSearchedMovies();
		};
	}, [setSearchedMovie, match.params.id, clearSearchedMovies]);

	const classes = useStyles();

	const SearchedList = loading ? (
		<Typography variant='h6'>Loading....</Typography>
	) : (
		searchedMovies.map((movie) => (
			<ListItem key={movie.id}>
				<MovieCard
					movieId={movie.id}
					movieTitle={movie.title}
					movieOverview={movie.overview}
					moviePoster={movie.poster_path}
				/>
			</ListItem>
		))
	);

	return (
		<Grid container>
			<Grid item container>
				<Card className={classes.cardStyles}>
					<CardContent>
						<Typography variant='h4'>
							You Searched: {match.params.id}
						</Typography>
						<Divider />
						<List component='nav' aria-label='main mailbox folders'>
							{SearchedList}
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

Searched.propTypes = {
	setSearchedMovie: PropTypes.func.isRequired,
	clearSearchedMovies: PropTypes.func.isRequired,
	searchedMovies: PropTypes.array,
	loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	searchedMovies: state.searchedMovies.searchedMovies,
	loading: state.popularMovies.loading,
});

const mapActionsToProps = {
	setSearchedMovie,
	clearSearchedMovies,
};

export default connect(mapStateToProps, mapActionsToProps)(Searched);
