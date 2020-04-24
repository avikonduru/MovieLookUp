import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(() => ({
	posterStyle: {
		height: '35vh',
		width: '200px',
		objectFit: 'cover',
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	cardStyle: {
		textAlign: 'center',
	},
}));

const ActorCard = ({
	actorId,
	actorName,
	actorCharacter,
	actorProfile,
	history,
}) => {
	const classes = useStyles();

	const handleClick = (id, e) => {
		e.preventDefault();
		history.push(`/actor/${id}`);
	};

	return (
		<CardActionArea onClick={(e) => handleClick(actorId, e)}>
			<Card>
				<CardContent className={classes.cardStyle}>
					<CardMedia
						className={classes.posterStyle}
						image={
							actorProfile != null
								? `https://image.tmdb.org/t/p/w1280${actorProfile}`
								: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
						}
					/>
					<br />
					<Typography>
						Name: {actorName}
						<br />
						Character: {actorCharacter}
					</Typography>
				</CardContent>
			</Card>
		</CardActionArea>
	);
};

ActorCard.propTypes = {
	actorId: PropTypes.number,
	actorName: PropTypes.string,
	actorCharacter: PropTypes.string,
	actorProfile: PropTypes.string,
	history: PropTypes.object,
};

export default withRouter(ActorCard);
