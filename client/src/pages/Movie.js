import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

//Redux
import { connect } from 'react-redux';
import { setMovie, clearMovie } from '../redux/actions/moviesAction';

//Material UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

//Component
import ActorCard from '../components/ActorCard';
import SimilarCard from '../components/SimilarCard';

const useStyles = makeStyles(() => ({
	titleStyles: {
		flex: 1,
	},
	ratingStyles: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	posterStyle: {
		height: 500,
		width: '100%',
		objectFit: 'cover',
	},
	scrollStyle: {
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'auto',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	cardStyle: {
		flex: '0 0 auto',
	},
}));

const Movie = ({ setMovie, clearMovie, movieData, loading, match }) => {
	useEffect(() => {
		setMovie(match.params.id);
		window.scrollTo(0, 0);

		return () => {
			clearMovie();
		};
	}, [setMovie, match.params.id, clearMovie]);

	const classes = useStyles();

	const MovieCard = loading ? (
		<Typography variant='h6'>Loading....</Typography>
	) : movieData === null || movieData === undefined ? (
		<Typography>Oops...</Typography>
	) : (
		<Fragment>
			<Grid item container>
				<Typography variant='h4' className={classes.titleStyles}>
					{movieData.movie.title}
				</Typography>
				<Typography className={classes.ratingStyles}>
					<Typography>Rating: {movieData.movie.vote_average}/10</Typography>
					<Typography>Vote Count: {movieData.movie.vote_count}</Typography>
				</Typography>
			</Grid>
			<br />
			<Divider />
			<br />
			<Grid item container>
				<Grid item xs={false} sm={3}>
					<CardMedia
						className={classes.posterStyle}
						image={
							movieData.movie.poster_path != null
								? `https://image.tmdb.org/t/p/w1280${movieData.movie.poster_path}`
								: 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
						}
					/>
				</Grid>
				<Grid item xs={false} sm={9}>
					<CardContent>
						<Typography component='h5' variant='h5'>
							Title: {movieData.movie.title}
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							Description: {movieData.movie.overview}
						</Typography>
					</CardContent>
					<CardContent>
						<Typography component='h6' variant='h5'>
							Movie Details:
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							<Grid item container spacing={1}>
								<Grid item>
									<Typography>Genre:</Typography>
								</Grid>
								{movieData.movie.genres.map((genre) => (
									<Grid item key={genre.id}>
										<Typography>{genre.name}</Typography>
									</Grid>
								))}
							</Grid>
							<Typography>
								Release Date:{' '}
								<Moment format='LL'>{movieData.movie.release_date}</Moment>
							</Typography>
							<Typography>
								Runtime: {movieData.movie.runtime} Minutes
							</Typography>
							<Typography>
								Revenue: ${movieData.movie.revenue.toLocaleString()}
							</Typography>
							<Typography>
								Budget: ${movieData.movie.budget.toLocaleString()}
							</Typography>
							<Grid item container spacing={1}>
								<Grid item>
									<Typography>Languages:</Typography>
								</Grid>
								{movieData.movie.spoken_languages.map((language) => (
									<Grid item key={language.iso_639_1}>
										<Typography>{language.name}</Typography>
									</Grid>
								))}
							</Grid>
						</Typography>
					</CardContent>
				</Grid>
			</Grid>
			<br />
			<Divider />
			<br />
			<Typography variant='h6' className={classes.titleStyles}>
				Cast
			</Typography>
			<div>
				<Grid item container spacing={2} className={classes.scrollStyle}>
					{movieData.cast.map((actor) => (
						<Grid item key={actor.id} className={classes.cardStyle}>
							<ActorCard
								actorId={actor.id}
								actorName={actor.name}
								actorCharacter={actor.character}
								actorProfile={actor.profile_path}
							/>
						</Grid>
					))}
				</Grid>
			</div>

			<br />
			<Divider />
			<br />
			<Typography variant='h6' className={classes.titleStyles}>
				Similar Movies
			</Typography>
			<Grid item container spacing={2} className={classes.scrollStyle}>
				{movieData.similar.map((movie) => (
					<Grid item key={movie.id} className={classes.cardStyle}>
						<SimilarCard
							movieId={movie.id}
							movieTitle={movie.title}
							moviePoster={movie.poster_path}
						/>
					</Grid>
				))}
			</Grid>
		</Fragment>
	);

	return (
		<Grid container spacing={2}>
			<Card>
				<CardContent>{MovieCard}</CardContent>
			</Card>
		</Grid>
	);
};

Movie.propTypes = {
	setMovie: PropTypes.func.isRequired,
	clearMovie: PropTypes.func.isRequired,
	movieData: PropTypes.object,
	loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	movieData: state.movie.movieData,
	loading: state.movie.loading,
});

const mapActionsToProps = {
	setMovie,
	clearMovie,
};

export default connect(mapStateToProps, mapActionsToProps)(Movie);
