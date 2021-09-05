import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import FetchStagesCount from '../Fetch/FetchStagesCount';
import FetchStage from '../Fetch/FetchStage';
import FetchFormationPlayer from '../Fetch/FetchFormationPlayer';
import FetchFormationNPC from '../Fetch/FetchFormationNPC';
import SetupStage from './SetupStage';
import PlayStage from './PlayStage';
import './Story.css';

const Story = () => {
	// Fetch account data
	const account = FetchAccount();
	
	// Fetch stages count data
	const stages_count = FetchStagesCount();
	
	// Fetch stage data
	const stage = FetchStage(account.data.current_stage, stages_count.data);
	
	// Fetch the player's formation data
	const formation_player = FetchFormationPlayer();
	
	// Fetch the NPC's formation data
	const formation_npc = FetchFormationNPC(account.data.current_stage);
	
	const [content, setContent] = useState(<p>Stage could not be loaded!</p>);
	let isLoading = false;
	let hasLoaded = false;
	
	const playContent = useCallback(() => {
		const stage_output = SetupStage(formation_player.data, formation_npc.data);
		
		setContent(
			<div className="content">
				<div className="stage">
					<h1>Stage {account.data.current_stage}</h1>
					<h2>{stage.data.name}</h2>
					<dl>
						<dt>Belly Reward</dt>
						<dd>{stage.data.belly_reward}</dd>
						<dt>Medallion Reward</dt>
						<dd>{stage.data.medallion_reward}</dd>
					</dl>
					<PlayStage stage={stage.data} form_player={formation_player.data} form_npc={formation_npc.data} output={stage_output} />
				</div>
			</div>
		);
	}, [account.data, stage.data, formation_player.data, formation_npc.data]);
	
	const modalContent = useCallback(() => {
		setContent(
			<div className="content">
				<div className="modal">
					<h1>Stage {account.data.current_stage}</h1>
					<h2>{stage.data.name}</h2>
					<button className="button" onClick={playContent}>Start</button>
				</div>
			</div>
		);
	}, [account.data, stage.data, playContent]);
	
	if(account.isLoading || stages_count.isLoading || stage.isLoading || formation_player.isLoading || formation_npc.isLoading) {
		isLoading = true;
	}
	
	if(Object.keys(account.data).length > 0 && Object.keys(stage.data).length > 0 && formation_player.data.length > 0 && formation_npc.data.length > 0) {
		hasLoaded = true;
	}
	
	useEffect(() => {
		if(isLoading) {
			setContent(<p>Loading...</p>);
		}
		
		if(hasLoaded) {
			modalContent();
		}
	}, [isLoading, hasLoaded, modalContent]);
	
	return (
		<div className="wrapper">
			<main>
				<div className="breadcrumb">
					<Link to="/">Menu</Link> &rsaquo; Story
				</div>
				{content}
			</main>
		</div>
	);
}

export default Story;