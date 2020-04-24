import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

//Redux
import { connect } from 'react-redux';
import { setActor, clearActor } from '../redux/actions/actorActions';

//Material UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	cardStyle: {
		flex: 1,
	},
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
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflowX: 'hidden',
	},
	gridListStyle: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
}));

const Actor = ({ setActor, clearActor, actorData, loading, match }) => {
	useEffect(() => {
		setActor(match.params.id);
		window.scrollTo(0, 0);

		return () => {
			clearActor();
		};
	}, [setActor, match.params.id, clearActor]);

	const classes = useStyles();

	const ActorCard = loading ? (
		<CardContent>
			<Typography>Loading...</Typography>
		</CardContent>
	) : actorData === null || actorData === undefined ? (
		<CardContent>
			<Typography>Oops...</Typography>
		</CardContent>
	) : (
		<Grid container spacing={2}>
			<Grid item xs={false} sm={3}>
				<CardMedia
					className={classes.posterStyle}
					image={
						actorData.profile_path != null
							? `https://image.tmdb.org/t/p/w1280${actorData.profile_path}`
							: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
					}
				/>
			</Grid>
			<Grid item xs={false} sm={9}>
				<CardContent>
					<Typography component='h5' variant='h5'>
						{actorData.name}
					</Typography>
					<Typography variant='subtitle1' color='textSecondary'>
						Biography: {actorData.biography}
					</Typography>
					<br />
					<Typography variant='subtitle1' color='textSecondary'>
						Gender:{' '}
						{actorData.gender === 1
							? 'Female'
							: actorData.gender === 2
							? 'Male'
							: 'Undisclosed'}
					</Typography>
					<Typography variant='subtitle1' color='textSecondary'>
						Birthday: <Moment format='LL'>{actorData.birthday}</Moment>
					</Typography>
					{actorData.deathday != null ? (
						<Typography variant='subtitle1' color='textSecondary'>
							Deathday: <Moment format='LL'>{actorData.deathday}</Moment>
						</Typography>
					) : (
						<Fragment />
					)}
					<Typography variant='subtitle1' color='textSecondary'>
						Place of Birth: {actorData.place_of_birth}
					</Typography>
					<Typography variant='subtitle1' color='textSecondary'>
						Known For: {actorData.known_for_department}
					</Typography>
				</CardContent>
			</Grid>
		</Grid>
	);

	return <Card className={classes.cardStyle}>{ActorCard}</Card>;
};

Actor.propTypes = {
	setActor: PropTypes.func.isRequired,
	clearActor: PropTypes.func.isRequired,
	actorData: PropTypes.object,
	loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	actorData: state.actor.actorData,
	loading: state.actor.loading,
});

const mapActionsToProps = {
	setActor,
	clearActor,
};

export default connect(mapStateToProps, mapActionsToProps)(Actor);
