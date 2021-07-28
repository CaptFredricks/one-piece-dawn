import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
	return(
		<div id="menu">
			<h1>One Piece Dawn</h1>
			<ul className="menu-buttons">
				<li><button>Fight!</button></li>
				<li><Link to="/formation/" className="menu-button">Formation</Link></li>
				<li><Link to="/characters/" className="menu-button">Characters</Link></li>
				<li><button>Settings</button></li>
			</ul>
		</div>
	);
};

export default Menu;