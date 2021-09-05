import React, { Component } from 'react';
import FormationPlayer from './Formations/FormationPlayer';
import FormationNPC from './Formations/FormationNPC';
import StageAdvanceForm from './StageAdvanceForm';
import StageRestartForm from './StageRestartForm';
import StatusUpdates from './StatusUpdates';

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
		
		this.stage = props.stage;
		this.form_player = props.form_player;
		this.form_npc = props.form_npc;
		this.winner = props.winner;
		this.output = props.output;
		this.i = 1;
		this.j = 0;
		
		this.player_hp = [];
		this.npc_hp = [];
		
		for(let k = 0; k < props.form_player.length; k++) {
			this.player_hp[k] = props.form_player[k].hp;
		}
		
		for(let k = 0; k < props.form_npc.length; k++) {
			this.npc_hp[k] = props.form_npc[k].hp;
		}
	}
	
	componentDidMount() {
		// Log the output in the console
		console.log(this.output);
		
		// Set the player and NPC characters' HP
		this.setState({ player_hp: [...this.player_hp], npc_hp: [...this.npc_hp] });
		
		this.interval = setInterval(() => {
			if(this.i < Object.keys(this.output).length && this.state.turn !== undefined) {
				// Play through a turn
				if(this.j < this.state.turn.length) {
					this.setState({
						turn_text: <strong>{`Turn ${this.i}/${Object.keys(this.output).length - 1}:`}</strong>
					});
					
					// Update the player's data
					if(this.output['turn_' + this.i][this.j].team === 'player') {
						this.form_player.forEach(ch => {
							if(this.output['turn_' + this.i][this.j].type === 'atk') {
								// Update the state
								this.setState(state => {
									const player = this.output['turn_' + this.i][this.j];
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
					if(this.output['turn_' + this.i][this.j].team === 'npc') {
						this.form_npc.forEach(ch => {
							if(this.output['turn_' + this.i][this.j].type === 'atk') {
								// Update the state
								this.setState(state => {
									const npc = this.output['turn_' + this.i][this.j];
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
					
					this.j++;
				} else {
					this.i++;
					this.setState({ turn: this.output['turn_' + this.i] });
					this.j = 0;
				}
			} else {
				this.setState({
					turn: null,
					turn_text: '',
					player: null,
					npc: null,
					text: `${this.output.winner.charAt(0).toUpperCase() + this.output.winner.slice(1)} wins!`
				});
				clearInterval(this.interval);
			}
		}, 3000);
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
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