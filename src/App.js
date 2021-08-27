import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Story from './components/Story/Story';
import Formation from './components/Formation/Formation';
import Characters from './components/Characters/Characters';
import Account from './components/Account/Account';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact={true} path="/" component={Menu} />
					<Route path="/story/" component={Story} />
					<Route path="/formation/" component={Formation} />
					<Route path="/characters/" component={Characters} />
					<Route path="/account/" component={Account} />
				</Switch>
			</div>
		);
	}
};

export default App;
