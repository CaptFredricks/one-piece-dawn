import React, { Component } from 'react';
import FormationPlayer from './Formations/FormationPlayer';
import FormationNPC from './Formations/FormationNPC';
import StageAdvanceForm from './StageAdvanceForm';
import StageRestartForm from './StageRestartForm';
import StatusUpdates from './StatusUpdates';

let delay = 3000;
let mult = 1;

// Calculate the timing delay
const calcDelay = () => {
	let result = delay * mult;
	++mult;
	
	return result;
}

class PlayStage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			turn: props.output.turn_1,
			turn_text: '',
			player: null,
			player_hp: [],
			npc: null,
			npc_hp: [],
			text: 'Begin!'
		}
		
		this.is_mounted = false;
		this.stage = props.stage;
		this.form_player = props.form_player;
		this.form_npc = props.form_npc;
		this.winner = props.winner;
		this.output = props.output;
		this.turn_length = [];
		
		// Calculate the length of each turn
		for(let i = 0; i < Object.keys(props.output).length; i++) {
			if(i === Object.keys(props.output).length - 1)
				this.turn_length[i] = 1;
			else
				this.turn_length[i] = props.output['turn_' + (i + 1)].length;
		}
		
		this.player_hp = [];
		this.npc_hp = [];
		
		// Calculate the player characters' HP
		for(let i = 0; i < props.form_player.length; i++) {
			this.player_hp[i] = props.form_player[i].hp;
		}
		
		// Calculate the NPC characters' HP
		for(let i = 0; i < props.form_npc.length; i++) {
			this.npc_hp[i] = props.form_npc[i].hp;
		}
		
		this.timer = 0;
	}
	
	componentDidMount() {
		this.is_mounted = true;
		
		// Log the output in the console
		console.log(this.output);
		
		// Set the player and NPC characters' HP
		this.setState({ player_hp: [...this.player_hp], npc_hp: [...this.npc_hp] });
		
		if(this.state.turn) {
			for(let i = 1; i <= Object.keys(this.output).length; i++) {
				for(let j = 0; j < this.turn_length[i - 1]; j++) {
					this.timer = setTimeout(() => {
						if(!this.is_mounted) return;
						
						if(i === Object.keys(this.output).length) {
							this.setState({
								turn: null,
								turn_text: '',
								player: null,
								npc: null,
								text: `${this.output.winner.charAt(0).toUpperCase() + this.output.winner.slice(1)} wins!`
							});
							return;
						} else {
							// Update the player's data
							if(this.output['turn_' + i][j].team === 'player') {
								this.form_player.forEach(ch => {
									if(this.output['turn_' + i][j]._class === 'atk') {
										// Update the state
										this.setState(state => {
											const player = this.output['turn_' + i][j];
											const npc = player.defender;
											const npc_hp = state.npc_hp.map((item, idx) => {
												if(npc.idx === idx) {
													return npc.hp;
												} else {
													return item;
												}
											});
											const text = <span>{player.text}<br />{npc.text}</span>;
											
											return {
												player,
												npc,
												npc_hp,
												text
											};
										});
									}
								});
							}
							
							// Update the NPC's data
							if(this.output['turn_' + i][j].team === 'npc') {
								this.form_npc.forEach(ch => {
									if(this.output['turn_' + i][j]._class === 'atk') {
										// Update the state
										this.setState(state => {
											const npc = this.output['turn_' + i][j];
											const player = npc.defender;
											const player_hp = state.player_hp.map((item, idx) => {
												if(player.idx === idx) {
													return player.hp;
												} else {
													return item;
												}
											});
											const text = <span>{npc.text}<br />{player.text}</span>;
											
											return {
												npc,
												player,
												player_hp,
												text
											};
										});
									}
								});
							}
						}
						
						if(j === 0) {
							this.setState({ turn: this.output['turn_' + i] });
							
							this.setState({
								turn_text: <strong>{`Turn ${i}/${Object.keys(this.output).length - 1}:`}</strong>
							});
						}
					}, calcDelay());
				}
			}
		}
	}
	
	componentWillUnmount() {
		// Perform some cleanup
		mult = 1;
		this.is_mounted = false;
		this.stage = null;
		this.form_player = null;
		this.form_npc = null;
		this.winner = null;
		this.output = null;
		this.turn_length = [];
		this.player_hp = [];
		this.npc_hp = [];
		
		// Clear the timer
		if(this.timer) clearTimeout(this.timer);
		this.timer = 0;
		
		// Clear the console
		console.clear();
	}
	
	render() {
		return (
			<section className="formations">
				<span className="versus">vs.</span>
				<FormationPlayer form={this.form_player} output={this.state.player} hp={this.state.player_hp} />
				<FormationNPC form={this.form_npc} output={this.state.npc} stage={this.stage.num} hp={this.state.npc_hp} />
				{this.state.turn === null ? (this.output.winner === 'player' ? <StageAdvanceForm data={this.stage} /> : <StageRestartForm />) : null}
				<StatusUpdates turn={this.state.turn_text} output={this.state.text} />
			</section>
		);
	}
}

export default PlayStage;