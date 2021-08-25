const PlayStage = (player_data, npc_data) => {
	const player = [...player_data];
	const npc = [...npc_data];
	const turns = 10;
	const output = [], output_stage = [];
	
	const getRandom = (max) => {
		return Math.floor(Math.random() * max);
	}
	
	const player_max_hp = [];
	const npc_max_hp = [];
	
	const player_abils_cd = [];
	const npc_abils_cd = [];
	
	if(player.length > 0) {
		for(let i = 0; i < player_data.length; i++) {
			// Calculate the max HP for the player's characters
			player_max_hp[i] = player_data[i].hp;
			
			player_abils_cd[i] = [];
			
			for(let j = 0; j < player_data[i].abilities.length; j++) {
				//if(player_data[i].abilities[j] !== undefined) {
					// Calculate the cooldowns for each character's abilities
					//player_abils_cd[i][j] = player_data[i].abilities[j].cooldown;
				//}
				
				player_abils_cd[i][j] = 0;
				//player[i].abilities[j].cooldown = 0;
			}
		}
	}
	
	if(npc.length > 0) {
		for(let i = 0; i < npc_data.length; i++) {
			// Calculate the max HP for the NPC's characters
			npc_max_hp[i] = npc_data[i].hp;
			
			npc_abils_cd[i] = [];
			
			for(let j = 0; j < npc_data[i].abilities.length; j++) {
				//if(npc_data[i].abilities[j] !== undefined) {
					// Calculate the cooldowns for each character's abilities
					//npc_abils_cd[i][j] = npc_data[i].abilities[j].cooldown;
				//}
				
				npc_abils_cd[i][j] = 0;
				//npc[i].abilities[j].cooldown = 0;
				//console.log(npc[i].abilities[j]);
			}
		}
	}
	
	// FORMULAS
	// Damage: level^2 + dmg + attack
	// Defense: level^2 + defense
	// Heal: level^2 + heal
	
	if(player.length > 0 && npc.length > 0) {
		// Play through each turn
		for(let turn = 0; turn < turns; turn++) {
			if(npc.length === 0) {
				output[turn] = ('Player wins!');
				break;
			} else if(player.length === 0) {
				output[turn] = ('NPC wins!');
				break;
			}
			
			output[turn] = ('Turn ' + (turn + 1) + ':;');
			
			// The player's turn
			player.forEach((ch, i) => {
				let rand, dmg, def, heal;
				let played = false;
				
				// Loop through the character's abilities
				for(let j = ch.abilities.length - 1; j >= 0; j--) {
					// If the character hasn't already played and their ability isn't defensive:
					if(!played && ch.abilities[j].defense === 0) {
						// If the character's ability isn't on cooldown and is unlocked:
						if(player_abils_cd[i][j] <= 0 && ch.level >= ch.abilities[j].lvl_unlock) {
							// Fetch a random number
							rand = getRandom(npc.length);
							
							// If the ability is an attack:
							if(ch.abilities[j].attack > 0) {
								// Calculate the damage of the attack
								dmg = Math.pow(ch.level, 2) + ch.dmg + ch.abilities[j].attack;
								
								let defense;
								
								// Loop through the opponent's abilities
								for(let k = npc[rand].abilities.length - 1; k >= 0; k--) {
									// If the opponent has a defensive ability:
									if(npc[rand].abilities[k].defense > 0) {
										// Ensure the ability isn't on cooldown
										if(npc_abils_cd[rand][k] <= 0) {
											// Calculate the defense
											def = npc[rand].abilities[k].defense;
											
											if(def > dmg)
												dmg = 0;
											else
												dmg -= def;
											
											defense = (npc[rand].name + ' defends with ' + npc[rand].abilities[k].name + ', negating ' + def + ' points of damage.;');
											
											// Reset the ability's cooldown
											npc_abils_cd[rand][k] = npc[rand].abilities[k].cooldown;
											break;
										}
									}
								}
								
								// Adjust the opponent's HP
								npc[rand].hp -= dmg;
								
								output[turn] += (ch.name + ' attacks ' + npc[rand].name + ' with ' + ch.abilities[j].name + ', dealing ' + dmg + ' points of damage.;');
								if(defense !== undefined) output[turn] += defense;
								
								// Check whether the opponent has died
								if(npc[rand].hp <= 0) {
									output[turn] += (npc[rand].name + ' was killed by ' + ch.name + '.;');
									
									// Remove the opponent from the game if they've died
									npc.splice(rand, 1);
									npc_abils_cd.splice(rand, 1);
								} else {
									output[turn] += (npc[rand].name + '\'s HP: ' + npc[rand].hp) + ';';
								}
							}
							
							// If the ability is a heal:
							if(ch.abilities[j].heal > 0) {
								// Calculate the effectiveness of the heal
								heal = Math.pow(ch.level, 2) + ch.abilities[j].heal;
								
								if(ch.hp + heal > player_max_hp)
									ch.hp = player_max_hp;
								else
									ch.hp += heal;
								
								output[turn] += (ch.name + ' heals ' + heal + ' points of damage.;');
								output[turn] += (ch.name + '\'s HP: ' + ch.hp) + ';';
							}
							
							// Reset the ability's cooldown
							player_abils_cd[i][j] = ch.abilities[j].cooldown;
							
							played = true;
						} else {
							// Update the ability's cooldown
							player_abils_cd[i][j]--;
						}
					} else {
						// Update the ability's cooldown
						player_abils_cd[i][j]--;
					}
				}
			});
			
			// The NPC's turn
			npc.forEach((ch, i) => {
				let rand, dmg, def, heal;
				let played = false;
				
				// Loop through the character's abilities
				for(let j = ch.abilities.length - 1; j >= 0; j--) {
					// If the character hasn't already played and their ability isn't defensive:
					if(!played && ch.abilities[j].defense === 0) {
						// If the character's ability isn't on cooldown:
						if(npc_abils_cd[i][j] <= 0) {
							//ch.abilities[j].cooldown
							// Fetch a random number
							rand = getRandom(player.length);
							
							// If the ability is an attack:
							if(ch.abilities[j].attack > 0) {
								// Calculate the damage of the attack
								dmg = Math.pow(ch.level, 2) + ch.dmg + ch.abilities[j].attack;
								
								let defense;
								
								// Loop through the opponent's abilities
								for(let k = player[rand].abilities.length - 1; k >= 0; k--) {
									// If the opponent has a defensive ability:
									if(player[rand].abilities[k].defense > 0 && player[rand].level >= player[rand].abilities[k].lvl_unlock) {
										// Ensure the ability isn't on cooldown
										if(npc_abils_cd[rand][k] <= 0) {
											//player[rand].abilities[k].cooldown
											// Calculate the defense
											def = player[rand].abilities[k].defense;
											
											if(def > dmg)
												dmg = 0;
											else
												dmg -= def;
											
											defense = (player[rand].name + ' defends with ' + player[rand].abilities[k].name + ', negating ' + def + ' points of damage.;');
											
											// Reset the ability's cooldown
											player_abils_cd[rand][k] = player[rand].abilities[k].cooldown;
											break;
										}
									}
								}
								
								// Adjust the opponent's HP
								player[rand].hp -= dmg;
								
								output[turn] += (ch.name + ' attacks ' + player[rand].name + ' with ' + ch.abilities[j].name + ', dealing ' + dmg + ' points of damage.;');
								if(defense !== undefined) output[turn] += defense;
								
								// Check whether the opponent has died
								if(player[rand].hp <= 0) {
									output[turn] += (player[rand].name + ' was killed by ' + ch.name + '.;');
									
									// Remove the opponent from the game if they've died
									player.splice(rand, 1);
									player_abils_cd.splice(rand, 1);
								} else {
									output[turn] += (player[rand].name + '\'s HP: ' + player[rand].hp) + ';';
								}
							}
							
							// If the ability is a heal:
							if(ch.abilities[j].heal > 0) {
								// Calculate the effectiveness of the heal
								heal = Math.pow(ch.level, 2) + ch.abilities[j].heal;
								
								if(ch.hp + heal > npc_max_hp)
									ch.hp = npc_max_hp;
								else
									ch.hp += heal;
								
								output[turn] += (ch.name + ' heals ' + heal + ' points of damage.;');
								output[turn] += (ch.name + '\'s HP: ' + ch.hp) + ';';
							}
							
							// Reset the ability's cooldown
							npc_abils_cd[i][j] = ch.abilities[j].cooldown;
							
							played = true;
						} else {
							// Update the ability's cooldown
							npc_abils_cd[i][j]--;
						}
					} else {
						// Update the ability's cooldown
						npc_abils_cd[i][j]--;
					}
				}
			});
		}
	}
	
	output.forEach((op, x) => {
		let filtered = output[x].split(';').filter(el => {
			return el;
		});
		
		output_stage[x] = filtered;
	});
	
	return output_stage;
}

export default PlayStage;