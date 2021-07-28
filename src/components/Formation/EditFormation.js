import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FormationForm from './FormationForm';

const EditFormation = ({ match }) => {
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
	
	let content = <p>No characters found!</p>;
	
	if(chData.length > 0) {
		content = <div className="content">
					<FormationForm form={fmData} chars={chData} />
				</div>;
	}
	
	if(chError) {
		content = <p>{chError}</p>;
	}
	
	if(chIsLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to="/formation/">Formation</Link> &rsaquo; Edit
			</div>
			{content}
		</main>
	);
};

export default EditFormation;