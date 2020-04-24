import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { setPopularMovies } from '../redux/actions/moviesAction';

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

const Popular = ({ setPopularMovies, popularMovies, loading }) => {
	useEffect(() => {
		setPopularMovies();
	}, [setPopularMovies]);

	const classes = useStyles();

	const MovieList = loading ? (
		<Typography variant='h6'>Loading....</Typography>
	) : (
		popularMovies.map((movie) => (
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
						<Typography variant='h4'>Popular Movies:</Typography>
						<Divider />
						<List component='nav' aria-label='main mailbox folders'>
							{MovieList}
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

Popular.propTypes = {
	setPopularMovies: PropTypes.func.isRequired,
	popularMovies: PropTypes.array,
};

const mapStateToProps = (state) => ({
	popularMovies: state.popularMovies.popularMovies,
	loading: state.popularMovies.loading,
});

const mapActionsToProps = {
	setPopularMovies,
};

export default connect(mapStateToProps, mapActionsToProps)(Popular);
