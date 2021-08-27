import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import FetchStoryStages from '../Fetch/FetchStoryStages';
import FetchStory from '../Fetch/FetchStory';
import FetchFormationPlayer from '../Fetch/FetchFormationPlayer';
import FetchFormationNPC from '../Fetch/FetchFormationNPC';
import PlayStage from './PlayStage';
import FormationPlayer from './Formations/FormationPlayer';
import FormationNPC from './Formations/FormationNPC';
import StageAdvanceForm from './StageAdvanceForm';
import StageRestartForm from './StageRestartForm';
import StatusUpdates from './StatusUpdates';
import './Story.css';

const Story = () => {
	// Fetch account data
	const account = FetchAccount();
	
	// Fetch story stages data
	const story_stages = FetchStoryStages();
	
	// Fetch story data
	const story = FetchStory(account.data.current_stage, story_stages.data);
	
	// Fetch the player's formation data
	const formation_player = FetchFormationPlayer();
	
	// Fetch the NPC's formation data
	const formation_npc = FetchFormationNPC(account.data.current_stage);
	
	const [content, setContent] = useState(<p>Stage could not be loaded!</p>);
	let isLoading = false;
	let hasLoaded = false;
	
	const playContent = useCallback(() => {
		const stage = PlayStage(formation_player.data, formation_npc.data);
		let winner;
		
		stage.forEach((turn, idx) => {
			if(turn.indexOf('WINNER') > -1) {
				winner = turn[1];
				stage.splice(idx, 1);
			}
		});
		
		setContent(
			<div className="content">
				<div className="stage">
					<h1>Stage {account.data.current_stage}</h1>
					<h2>{story.data.stage}</h2>
					<dl>
						<dt>Belly Reward</dt>
						<dd>{story.data.belly_reward}</dd>
						<dt>Level Point Reward</dt>
						<dd>{story.data.lvl_point_reward}</dd>
					</dl>
					<FormationPlayer data={formation_player.data} />
					<FormationNPC data={formation_npc.data} stage={account.data.current_stage} />
					{winner === 'player' ? <StageAdvanceForm data={story.data} /> : <StageRestartForm />}
					<StatusUpdates output={stage} />
				</div>
			</div>
		);
	}, [account.data, story.data, formation_player.data, formation_npc.data]);
	
	const modalContent = useCallback(() => {
		setContent(
			<div className="content">
				<div className="modal">
					<h1>Stage {account.data.current_stage}</h1>
					<h2>{story.data.stage}</h2>
					<button className="button" onClick={playContent}>Start</button>
				</div>
			</div>
		);
	}, [account.data, story.data, playContent]);
	
	if(account.isLoading || story_stages.isLoading || story.isLoading || formation_player.isLoading || formation_npc.isLoading) {
		isLoading = true;
	}
	
	if(Object.keys(account.data).length > 0 && Object.keys(story.data).length > 0 && formation_player.data.length > 0 && formation_npc.data.length > 0) {
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