import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
	return(
		<div id="menu">
			<h1>One Piece Dawn</h1>
			<ul className="menu-buttons">
				<li><Link to="/story/" className="menu-button">Set Sail!</Link></li>
				<li><Link to="/formation/" className="menu-button">Formation</Link></li>
				<li><Link to="/characters/" className="menu-button">Characters</Link></li>
				<li><Link to="/account/" className="menu-button">Account</Link></li>
				<li><button>Settings</button></li>
			</ul>
		</div>
	);
};

export default Menu;