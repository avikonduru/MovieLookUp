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
		height: '40vh',
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

const SimilarCard = ({ movieId, movieTitle, moviePoster, history }) => {
	const classes = useStyles();

	const handleClick = (id, e) => {
		e.preventDefault();
		history.push(`/movie/${id}`);
	};

	return (
		<CardActionArea onClick={(e) => handleClick(movieId, e)}>
			<Card>
				<CardContent className={classes.cardStyle}>
					<CardMedia
						className={classes.posterStyle}
						image={`https://image.tmdb.org/t/p/w1280${moviePoster}`}
					/>
					<br />
					<Typography>{movieTitle}</Typography>
				</CardContent>
			</Card>
		</CardActionArea>
	);
};

SimilarCard.propTypes = {
	movieId: PropTypes.number,
	movieTitle: PropTypes.string,
	moviePoster: PropTypes.string,
	history: PropTypes.object,
};

export default withRouter(SimilarCard);
