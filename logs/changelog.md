# One Piece Dawn changelog

*Legend: N - new file, D - deprecated file, R - renamed file, X - removed file, M - minor change*<br>
*Versions: X.x.x (major releases), x.X.x (standard releases), x.x.X (minor releases/bug fixes)*<br>
*Other: [a] - alpha, [b] - beta*

## Version 0.4.0 (2021-08-25)

- Characters that aren't unlocked can no longer be added to the player's formation
- Players can now see which characters they have unlocked
- A character can now only be placed in a single slot on the player's formation
- Characters can now be purchased via their character cards
- The story can now be advanced upon successfully winning a stage

**Modified files:**
- src/App.css (M)
- src/App.js
- src/components/Account/Account.js
- src/components/Characters/Character.js
- src/components/Characters/CharacterCard.js
- src/components/Characters/CharacterPurchase.js (N)
- src/components/Characters/Characters.css
- src/components/Characters/Characters.js
- src/components/Characters/PurchaseForm.js (N)
- src/components/Fetch/FetchCharacters.js
- src/components/Fetch/FetchStory.js
- src/components/Fetch/FetchStoryStages.js (N)
- src/components/Formation/EditFormation.js
- src/components/Formation/Formation.css
- src/components/Formation/Formation.js
- src/components/Formation/FormationForm.js
- src/components/Story/PlayStage.js
- src/components/Story/StageAdvanceForm.js (N)
- src/components/Story/StageRestartForm.js (N)
- src/components/Story/Story.css
- src/components/Story/Story.js

## Version 0.3.0 (2021-08-24)

- Added account management
- Code cleanup
- Separated all database fetching into separate components
- Abilities data for both the player and NPC formations are now fetched along with the character data
- Streamlined the player and NPC formation components
- Created the gameplay for a story stage
- Revamped the story component
- The status update component now displays information about each stage, turn by turn

**Modified files:**
- src/App.js
- src/assets/Belly.png (N)
- src/components/Account/Account.css (N)
- src/components/Account/Account.js (N)
- src/components/Account/AccountForm.js (N)
- src/components/Account/EditAccount.js (N)
- src/components/Characters/CharacterCard.js
- src/components/Characters/Characters.js
- src/components/Fetch/FetchAbilities.js (N)
- src/components/Fetch/FetchAccount.js (N)
- src/components/Fetch/FetchCharacter.js (N)
- src/components/Fetch/FetchCharacters.js (N)
- src/components/Fetch/FetchFormation.js (N)
- src/components/Fetch/FetchFormationNPC.js (N)
- src/components/Fetch/FetchFormationPlayer.js (N)
- src/components/Fetch/FetchFormationStage.js (N)
- src/components/Fetch/FetchStory.js (N)
- src/components/Formation/EditFormation.js
- src/components/Formation/Formation.js
- src/components/Formation/FormationForm.js
- src/components/Menu.js
- src/components/Story/Formations/FormationNPC.js (N)
- src/components/Story/Formations/FormationPlayer.js (N)
- src/components/Story/PlayStage.js (N)
- src/components/Story/StatusUpdates.js (N)
- src/components/Story/Story.css (N)
- src/components/Story/Story.js (N)

## Version 0.2.0 (2021-07-24)

- Added formations
- Added level unlock info to character cards
- Added a license (GNU General Public License, ver. 3)

**Modified files:**
- LICENSE.md (N)
- public/index.html (M)
- src/App.js (M)
- src/components/Characters/CharacterCard.js
- src/components/Formation/EditFormation.js (N)
- src/components/Formation/Formation.css (N)
- src/components/Formation/Formation.js (N)
- src/components/Formation/FormationForm.js (N)
- src/components/Menu.js (M)

## Version 0.1.0 (2021-07-22)

- Set up all the core files
- Created a basic game menu
- Set up a character index and individual character cards

**Modified files:**
- .gitignore (N)
- README.md (N)
- logs/changelog.md (N)
- package-lock.json (N)
- package.json (N)
- public/favicon.ico (N)
- public/index.html (N)
- public/logo192.png (N)
- public/logo512.png (N)
- public/manifest.json (N)
- public/robots.txt (N)
- src/App.css (N)
- src/App.js (N)
- src/App.test.js (N)
- src/components/Characters/Character.js (N)
- src/components/Characters/CharacterCard.js (N)
- src/components/Characters/Characters.css (N)
- src/components/Characters/Characters.js (N)
- src/components/Menu.css (N)
- src/components/Menu.js (N)
- src/index.css (N)
- src/index.js (N)
- src/logo.svg (N)
- src/reportWebVitals.js (N)
- src/setupProxy.js (N)
- src/setupTests.js (N)