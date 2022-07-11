import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import FetchCharactersCount from '../Fetch/FetchCharactersCount';
import FetchCharacters from '../Fetch/FetchCharacters';
import Character from './Character';
import CharacterCard from './CharacterCard';
import CharacterPurchase from './CharacterPurchase';
import './Characters.css';

const Characters = (props, { match }) => {
	const path = '/characters/';
	const [page, setPage] = useState({ current: 1, start: 0 });
	const [update, setUpdate] = useState(false);
	const per_page = 10;
	let page_count = 0;
	
	// Fetch account data
	const account = FetchAccount(props.token);
	
	// Fetch characters count data
	const characters_count = FetchCharactersCount();
	
	if(characters_count.data > 0) {
		// Set the page count
		page_count = Math.ceil(characters_count.data / per_page);
	}
	
	// Fetch characters data
	const characters = FetchCharacters(page.start, per_page, update);
	
	const resetUpdate = useCallback(() => {
		setUpdate(false);
	}, []);
	
	// Go to first page
	const firstPage = useCallback(() => {
		let current = 1;
		let start = 0;
		
		setPage({ current: current, start: start });
		setUpdate(true);
	}, []);
	
	// Go to previous page
	const prevPage = useCallback(() => {
		let current = --page.current;
		let start = (current * per_page) - per_page;
		
		setPage({ current: current, start: start });
		setUpdate(true);
	}, [page, per_page]);
	
	// Go to next page
	const nextPage = useCallback(() => {
		let current = ++page.current;
		let start = (current * per_page) - per_page;
		
		setPage({ current: current, start: start });
		setUpdate(true);
	}, [page, per_page]);
	
	// Go to last page
	const lastPage = useCallback(() => {
		let current = page_count;
		let start = (current * per_page) - per_page;
		
		setPage({ current: current, start: start });
		setUpdate(true);
	}, [page_count, per_page]);
	
	const [content, setContent] = useState(<p>No characters found!</p>);
	let is_loading = false;
	let has_loaded = false;
	
	const pageContent = useCallback(() => {
		setContent(
			<div className="content">
				<h1>Characters</h1>
				<table className="characters">
					<thead>
						<tr>
							<th>Name</th>
							<th>HP</th>
							<th>Attack</th>
							<th>Defense</th>
							<th>Tier</th>
							<th>Level</th>
							<th>Class</th>
							<th>Unlocked?</th>
							<th>Purchased?</th>
						</tr>
					</thead>
					<tbody>
						{characters.data.map(ch => {
							return <Character key={ch.id} id={ch.id} name={ch.name} hp={ch.hp} attack={ch.attack} defense={ch.defense} tier={ch.tier} level={ch.level ?? 1} _class={ch._class} unlock={ch.unlock} stage={account.data.current_stage} cost={ch.cost} is_owned={ch.is_owned} />
						})}
					</tbody>
				</table>
				<div className="pagination">
					{page.current > 1 ? <span>
						<button className="button" title="First Page" onClick={firstPage}>&laquo;</button>
						<button className="button" title="Previous Page" onClick={prevPage}>&lsaquo;</button>
					</span> : null}
					<span>Page {page.current} of {page_count}</span>
					{page.current < page_count ? <span>
						<button className="button" title="Next Page" onClick={nextPage}>&rsaquo;</button>
						<button className="button" title="Last Page" onClick={lastPage}>&raquo;</button>
					</span> : null}
				</div>
			</div>
		);
	}, [characters.data, account.data, page, page_count, firstPage, prevPage, nextPage, lastPage]);
	
	if(account.isLoading || characters_count.isLoading || characters.isLoading) is_loading = true;
	
	if(Object.keys(account.data).length > 0 && Object.keys(characters.data).length > 0) has_loaded = true;
	
	useEffect(() => {
		if(is_loading) setContent(<p>Loading...</p>);
		if(has_loaded) pageContent();
		
		if(update) resetUpdate();
	}, [is_loading, has_loaded, pageContent, update, resetUpdate]);
	
	return (
		<div className="wrapper">
			<Switch>
				<Route exact={true} path={path}>
					<main>
						<div className="breadcrumb">
							<Link to="/">Menu</Link> &rsaquo; Characters
						</div>
						{content}
					</main>
				</Route>
				<Route path={`${path}card/:id`} render={(match) => <CharacterCard {...match} {...account} />} />
				<Route path={`${path}purchase/:id`} render={(match) => <CharacterPurchase {...match} {...account} />} />
			</Switch>
		</div>
	);
};

export default Characters;