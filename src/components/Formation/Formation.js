import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route } from 'react-router-dom';
import EditFormation from './EditFormation';
import './Formation.css';

const Formation = ({ match }) => {
	const [fmData, setFmData] = useState([]);
	const [chData, setChData] = useState([]);
	const [fmIsLoading, setFmIsLoading] = useState(false);
	const [chIsLoading, setChIsLoading] = useState(false);
	const [fmError, setFmError] = useState(null);
	const [chError, setChError] = useState(null);
	const fmPath = '/formation/';
	const chPath = '/characters/';
	
	/* Fetch formation data */
	
	const fetchFormData = useCallback(async () => {
		setFmIsLoading(true);
		setFmError(null);
		
		try {
			const response = await fetch(`/api${fmPath}`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();

			setFmData(dataIn);
		} catch(error) {
			setFmError(error.message);
		}
		setFmIsLoading(false);
	}, []);
	
	/* Fetch character data */
	
	const fetchCharData = useCallback(async () => {
		setChIsLoading(true);
		setChError(null);
		
		try {
			const response = await fetch(`/api${chPath}`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();
			
			const transformedData = dataIn.results.map(row => {
				return {
					id: row.id,
					name: row.name
				};
			});
			setChData(transformedData);
		} catch(error) {
			setChError(error.message);
		}
		setChIsLoading(false);
	}, []);
	
	useEffect(() => {
		fetchFormData();
		fetchCharData();
	}, [fetchFormData, fetchCharData]);
	
	let formation = [fmData.slot_1, fmData.slot_2, fmData.slot_3, fmData.slot_4, fmData.slot_5];
	
	formation.forEach((fm, idx) => {
		chData.some(ch => {
			if(ch.id === fm) {
				formation[idx] = ch.name;
				return true;
			} else if(fm === 0) {
				formation[idx] = <i>empty</i>;
				return true;
			}
		});
	});
	
	let content = <p>No formations found!</p>;
	
	if(formation.length > 0) {
		content = <div className="content">
					<div className="formation">
						<h1>Your Formation</h1>
						<ul>
							{formation.map((slot, idx) => {
								return <li key={idx}>{slot}</li>
							})}
						</ul>
					</div>
				</div>;
	}
	
	if(fmError) {
		content = <p>{fmError}</p>;
	}
	
	if(fmIsLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<Route exact={true} path={`${fmPath}`}>
				<main>
					<div className="breadcrumb">
						<Link to="/">Menu</Link> &rsaquo; Formation
					</div>
					{content}
					<Link to={`${fmPath}edit/`} className="button">Edit Formation</Link>
				</main>
			</Route>
			<Route path={`${fmPath}edit/`} component={EditFormation} />
		</div>
	);
};

export default Formation;