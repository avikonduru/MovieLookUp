import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	bar: {
		background: '#ffbf00',
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
		cursor: 'pointer',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const Navbar = ({ history }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const classes = useStyles();

	const handleClick = (e) => {
		e.preventDefault();
		history.push('/');
	};

	const onChange = (e) => {
		setSearchTerm(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchTerm !== '') {
			history.push(`/searched/${searchTerm}`);
		}
	};

	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.bar}>
				<Toolbar>
					<Typography
						className={classes.title}
						variant='h6'
						noWrap
						onClick={handleClick}
					>
						Movie Lookup
					</Typography>
					<form onSubmit={handleSubmit}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search Movie…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
								value={searchTerm}
								onChange={onChange}
							/>
						</div>
					</form>
				</Toolbar>
			</AppBar>
		</div>
	);
};

Navbar.propTypes = {
	history: PropTypes.object,
};

export default withRouter(Navbar);
