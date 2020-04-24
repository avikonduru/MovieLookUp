import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Material UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//Pages
import Popular from './pages/Popular';
import Searched from './pages/Searched';
import Movie from './pages/Movie';
import Actor from './pages/Actor';

//Components
import Navbar from './components/Navbar';

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
}));

const App = () => {
	const classes = useStyles();

	return (
		<Provider store={store}>
			<Router>
				<Grid container direction='column'>
					<Grid item>
						<Navbar />
					</Grid>
					<br />
					<div className={classes.toolbar} />
					<Grid item container>
						<Grid item xs={false} sm={1} />
						<Grid item xs={12} sm={10}>
							<Switch>
								<Route exact path='/' component={Popular} />
								<Route exact path='/searched/:id' component={Searched} />
								<Route exact path='/movie/:id' component={Movie} />
								<Route exact path='/actor/:id' component={Actor} />
							</Switch>
						</Grid>
						<Grid item xs={false} sm={1} />
					</Grid>
				</Grid>
			</Router>
		</Provider>
	);
};

export default App;
