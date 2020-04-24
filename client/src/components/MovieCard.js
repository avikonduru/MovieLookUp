import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	cardStyles: {
		flex: 1,
	},
	posterStyle: {
		height: '35vh',
		width: '100%',
		objectFit: 'cover',
	},
}));

const MovieCard = ({
	movieId,
	movieTitle,
	movieOverview,
	moviePoster,
	history,
}) => {
	const classes = useStyles();

	const handleClick = (id, e) => {
		e.preventDefault();
		history.push(`/movie/${id}`);
	};

	return (
		<CardActionArea onClick={(e) => handleClick(movieId, e)}>
			<Card className={classes.cardStyles}>
				<Grid container>
					<Grid item xs={false} sm={2}>
						<CardMedia
							className={classes.posterStyle}
							image={
								moviePoster != null
									? `https://image.tmdb.org/t/p/w1280${moviePoster}`
									: 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
							}
						/>
					</Grid>
					<Grid item xs={false} sm={10}>
						<CardContent>
							<Typography component='h5' variant='h5'>
								{movieTitle}
							</Typography>
							<Typography variant='subtitle1' color='textSecondary'>
								{movieOverview}
							</Typography>
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		</CardActionArea>
	);
};

MovieCard.propTypes = {
	movieId: PropTypes.number,
	movieTitle: PropTypes.string,
	movieOverview: PropTypes.string,
	moviePoster: PropTypes.string,
	history: PropTypes.object,
};

export default withRouter(MovieCard);
