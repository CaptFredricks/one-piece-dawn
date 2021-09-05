const SetupStage = (player_data, npc_data) => {
	const player = player_data.map(data => ({...data}));
	const npc = npc_data.map(data => ({...data}));
	const turns = 10;
	const output = {};
	const player_max_hp = [];
	const npc_max_hp = [];
	const player_abils_cd = [];
	const npc_abils_cd = [];
	
	// Generate a random number
	const getRandom = (max = 0) => {
		if(max === 0)
			return Math.random();
		else
			return Math.floor(Math.random() * max);
	}
	
	// Calculate a character's hitpoint value
	const calcHP = (lvl, tier, hp) => {
		return Math.round(Math.pow(lvl, 2) / 5 * (tier / 5) + hp);
	}
	
	// Calculate a character's attack value
	const calcAtk = (lvl, tier, base_atk, atk_dmg) => {
		return Math.round(Math.pow(lvl, 2) / 5 * (tier / 5) + (base_atk + atk_dmg));
		//return Math.pow(lvl, 2) + base_atk + atk_dmg;
	}
	
	// Calculate a character's defense value
	const calcDef = (lvl, tier, base_def, abil_def = 0) => {
		return Math.round(Math.pow(lvl, 2) / 5 * (tier / 5) + (base_def + abil_def));
		//return Math.pow(lvl, 2) + base_def + abil_def;
	}
	
	// Calculate a character's heal value
	const calcHeal = (lvl, tier, heal) => {
		return Math.round(Math.pow(lvl, 2) / 5 * (tier / 5) + heal);
		//return Math.pow(lvl, 2) + heal;
	}
	
	// Calculate a character's critical chance
	const calcCritChance = (lvl, tier) => {
		return 0.05 / ((5 / Math.pow(lvl, 2)) + (5 / tier));
	}
	
	// Calculate a character's critical attack
	const calcCritAtk = (atk, lvl, tier) => {
		return Math.round(0.05 * atk + ((Math.pow(lvl, 2) / 5) + (tier / 5)));
	}
	
	if(player.length > 0 && npc.length > 0) {
		for(let i = 0; i < player_data.length; i++) {
			// Give the character an index
			player[i].idx = i;
			
			// Calculate the max HP for the player's characters
			player_max_hp[i] = calcHP(player_data[i].level, player_data[i].tier, player_data[i].hp);
			
			player_abils_cd[i] = [];
			
			for(let j = 0; j < player_data[i].abilities.length; j++) {
				// Set the player characters' cooldowns to zero
				player_abils_cd[i][j] = 0;
			}
		}
		
		for(let i = 0; i < npc_data.length; i++) {
			// Give the character an index
			npc[i].idx = i;
			
			// Calculate the max HP for the NPC's characters
			npc_max_hp[i] = calcHP(1, npc_data[i].tier, npc_data[i].hp);
			
			npc_abils_cd[i] = [];
			
			for(let j = 0; j < npc_data[i].abilities.length; j++) {
				// Set the NPC characters' cooldowns to zero
				npc_abils_cd[i][j] = 0;
			}
		}
		
		// Play through each turn
		for(let turn = 0; turn <= turns; turn++) {
			let current_turn = 'turn_' + (turn + 1);
			let x = 0;
			
			if(npc.length === 0) {
				output['winner'] = 'player';
				break;
			} else if(player.length === 0 || turn === turns) {
				output['winner'] = 'npc';
				break;
			}
			
			output[current_turn] = [];
			
			// The player's turn
			player.every((ch, i) => {
				let rand, atk, def, heal, crit;
				let played = false;
				
				// Stop executing if the NPC's characters are all dead
				if(npc.length === 0) return false;
				
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
								// Calculate the attack
								atk = calcAtk(ch.level, ch.tier, ch.attack, ch.abilities[j].attack);
								
								if(getRandom() <= calcCritChance(ch.level, ch.tier)) {
									// Calculate the critical attack
									crit = calcCritAtk(atk, ch.level, ch.tier);
									
									// Add the critical attack to the attack value
									atk += crit;
								}
								
								let defense;
								
								// Calculate the opponent's defense
								def = calcDef(1, npc[rand].tier, npc[rand].defense);
								
								defense = {
									team: 'npc',
									type: 'def',
									idx: npc[rand].idx,
									name: npc[rand].name,
									def: def
								};
								
								// Loop through the opponent's abilities
								for(let k = npc[rand].abilities.length - 1; k >= 0; k--) {
									// If the opponent has a defensive ability:
									if(npc[rand].abilities[k].defense > 0) {
										// Ensure the ability isn't on cooldown
										if(npc_abils_cd[rand][k] <= 0) {
											// Calculate the defense
											def = calcDef(1, npc[rand].tier, npc[rand].defense, npc[rand].abilities[k].defense);
											
											defense.abil = npc[rand].abilities[k].name;
											defense.text = (npc[rand].name + ' defends with ' + npc[rand].abilities[k].name + ', negating ' + def + ' points of damage.');
											
											// Reset the ability's cooldown
											npc_abils_cd[rand][k] = npc[rand].abilities[k].cooldown;
											break;
										}
									}
								}
								
								if(def > atk)
									atk = 0;
								else
									atk -= def;
								
								// Adjust the opponent's HP
								npc[rand].hp -= atk;
								
								// Check whether the opponent has died
								if(npc[rand].hp <= 0) {
									// Save the death to output
									defense.hp = 0;
									defense.text = (npc[rand].name + ' was killed by ' + ch.name + '.');
								} else {
									// Save the HP to output
									defense.hp = npc[rand].hp;
								}
								
								// Save the attack to output
								output[current_turn][x] = {
									team: 'player',
									type: 'atk',
									idx: ch.idx,
									name: ch.name,
									abil: ch.abilities[j].name,
									atk: atk,
									defender: defense,
									text: (ch.name + ' attacks ' + npc[rand].name + ' with ' + ch.abilities[j].name + ', dealing ' + atk + ' points of damage.')
								};
								x++;
								
								if(npc[rand].hp <= 0) {
									// Remove the opponent from the game if they've died
									npc.splice(rand, 1);
									npc_abils_cd.splice(rand, 1);
								}
							}
							
							// If the ability is a heal:
							if(ch.abilities[j].heal > 0) {
								// Calculate the effectiveness of the heal
								heal = calcHeal(ch.level, ch.tier, ch.abilities[j].heal);
								
								if(ch.hp + heal > player_max_hp[i])
									ch.hp = player_max_hp[i];
								else
									ch.hp += heal;
								
								// Save the heal to output
								output[current_turn][x] = {
									team: 'player',
									type: 'heal',
									idx: ch.idx,
									name: ch.name,
									heal: heal,
									text: (ch.name + ' heals ' + heal + ' points of damage.')
								};
								x++;
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
				
				return true;
			});
			
			// The NPC's turn
			npc.every((ch, i) => {
				let rand, atk, def, heal, crit;
				let played = false;
				
				// Stop executing if the player's characters are all dead
				if(player.length === 0) return false;
				
				// Loop through the character's abilities
				for(let j = ch.abilities.length - 1; j >= 0; j--) {
					// If the character hasn't already played and their ability isn't defensive:
					if(!played && ch.abilities[j].defense === 0) {
						// If the character's ability isn't on cooldown:
						if(npc_abils_cd[i][j] <= 0) {
							// Fetch a random number
							rand = getRandom(player.length);
							
							// If the ability is an attack:
							if(ch.abilities[j].attack > 0) {
								// Calculate the attack
								atk = calcAtk(1, ch.tier, ch.attack, ch.abilities[j].attack);
								
								if(getRandom() <= calcCritChance(ch.level, ch.tier)) {
									// Calculate the critical attack
									crit = calcCritAtk(atk, ch.level, ch.tier);
									
									// Add the critical attack to the attack value
									atk += crit;
								}
								
								let defense;
								
								// Calculate the opponent's defense
								def = calcDef(player[rand].level, player[rand].tier, player[rand].defense);
								
								defense = {
									team: 'player',
									type: 'def',
									idx: player[rand].idx,
									name: player[rand].name,
									def: def
								};
								
								// Loop through the opponent's abilities
								for(let k = player[rand].abilities.length - 1; k >= 0; k--) {
									// If the opponent has a defensive ability:
									if(player[rand].abilities[k].defense > 0 && player[rand].level >= player[rand].abilities[k].lvl_unlock) {
										// Ensure the ability isn't on cooldown
										if(player_abils_cd[rand][k] <= 0) {
											// Calculate the defense
											def = calcDef(player[rand].level, player[rand].tier, player[rand].defense, player[rand].abilities[k].defense);
											
											defense.abil = player[rand].abilities[k].name;
											defense.text = (player[rand].name + ' defends with ' + player[rand].abilities[k].name + ', negating ' + def + ' points of damage.');
											
											// Reset the ability's cooldown
											player_abils_cd[rand][k] = player[rand].abilities[k].cooldown;
											break;
										}
									}
								}
								
								if(def > atk)
									atk = 0;
								else
									atk -= def;
								
								// Adjust the opponent's HP
								player[rand].hp -= atk;
								
								// Check whether the opponent has died
								if(player[rand].hp <= 0) {
									// Save the death to output
									defense.hp = 0;
									defense.text = (player[rand].name + ' was killed by ' + ch.name + '.');
								} else {
									// Save the HP to output
									defense.hp = player[rand].hp;
								}
								
								output[current_turn][x] = {
									team: 'npc',
									type: 'atk',
									idx: ch.idx,
									name: ch.name,
									abil: ch.abilities[j].name,
									atk: atk,
									defender: defense,
									text: (ch.name + ' attacks ' + player[rand].name + ' with ' + ch.abilities[j].name + ', dealing ' + atk + ' points of damage.')
								};
								x++;
								
								if(player[rand].hp <= 0) {
									// Remove the opponent from the game if they've died
									player.splice(rand, 1);
									player_abils_cd.splice(rand, 1);
								}
							}
							
							// If the ability is a heal:
							if(ch.abilities[j].heal > 0) {
								// Calculate the effectiveness of the heal
								heal = calcHeal(1, ch.tier, ch.abilities[j].heal);
								
								if(ch.hp + heal > npc_max_hp[i])
									ch.hp = npc_max_hp[i];
								else
									ch.hp += heal;
								
								// Save the heal to output
								output[current_turn][x] = {
									team: 'npc',
									type: 'heal',
									idx: ch.idx,
									name: ch.name,
									heal: heal,
									text: (ch.name + ' heals ' + heal + ' points of damage.')
								};
								x++;
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
				
				return true;
			});
		}
	}
	
	//console.log(output);
	return output;
}

export default SetupStage;