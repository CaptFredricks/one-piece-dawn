import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
	return(
		<div id="menu">
			<h1>One Piece Dawn</h1>
			<div className="menu-buttons-wrap">
				<ul className="menu-buttons left">
					<li><Link to="/formation/" className="menu-button">Formation</Link></li>
					<li><Link to="/characters/" className="menu-button">Characters</Link></li>
				</ul>
				<ul className="menu-buttons center">
					<li><Link to="/story/" className="menu-button">Set Sail!</Link></li>
				</ul>
				<ul className="menu-buttons right">
					<li><Link to="/account/" className="menu-button">Account</Link></li>
					<li><button>Settings</button></li>
				</ul>
			</div>
		</div>
	);
};

export default Menu;