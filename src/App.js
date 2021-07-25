import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';
//import Formation from './components/Formation/Formation';
import Characters from './components/Characters/Characters';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact={true} path="/" component={Menu} />
				
				<Route path="/characters/" component={Characters} />
			</div>
		);
	}
};

export default App;
