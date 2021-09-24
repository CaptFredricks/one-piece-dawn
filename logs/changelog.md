# One Piece Dawn changelog

*Legend: N - new file, D - deprecated file, R - renamed file, X - removed file, M - minor change*<br>
*Versions: X.x.x (major releases), x.X.x (standard releases), x.x.X (minor releases/bug fixes)*<br>
*Other: [a] - alpha, [b] - beta*

## Version 0.7.0 (2021-09-22)

- Tweaked the main menu design
- A message now displays notifying the player when they've reached the end of the story
- Code cleanup
- Redesigned the formation page
- Tweaked the design of character cards
- Tweaked several files to coincide with a database revamp
- Completely rewrote the timing function for the `PlayStage` component
- Reworked the character's max level formula

**Modified files:**
- src/App.js (M)
- src/components/Account/AccountForm.js (M)
- src/components/Characters/Character.js
- src/components/Characters/CharacterCard.js
- src/components/Characters/CharacterPurchase.js
- src/components/Characters/Characters.css
- src/components/Characters/Characters.js
- src/components/Fetch/FetchAbilities.js
- src/components/Fetch/FetchAccount.js
- src/components/Fetch/FetchCharacter.js
- src/components/Fetch/FetchCharacters.js
- src/components/Fetch/FetchFormation.js
- src/components/Fetch/FetchFormationNPC.js
- src/components/Fetch/FetchFormationPlayer.js
- src/components/Formation/EditFormation.js
- src/components/Formation/Formation.css
- src/components/Formation/Formation.js
- src/components/Menu.css
- src/components/Menu.js
- src/components/Story/Formations/FormationNPC.js
- src/components/Story/Formations/FormationPlayer.js
- src/components/Story/PlayStage.js
- src/components/Story/SetupStage.js
- src/components/Story/Story.css
- src/components/Story/Story.js

## Version 0.6.0 (2021-09-04)

- Code cleanup
- Renamed `FetchStory.js` to `FetchStage.js` and `FetchStoryStages.js` to `FetchStagesCount.js`
- Tweaked the formulas that calculate attack, defense, and heals
- Added character images and HP bars to the stage formations
- Stages are now much more dynamic; in addition to the status update bar at the bottom, both the player and NPC characters' HP and status now update in real time
- Added images for the following characters:
 - Mountain Bandit
 - Heppoko
 - Peppoko
 - Helmeppo
 - Rokkaku
 - Ukkari
 - Roronoa Zoro
- Fixed a bug that occurred if either team's last character was killed before the opposing team's characters had finished their current turn
- Added `todo.txt` to the `.gitignore`

**Modified files:**
- .gitignore (M)
- public/images/characters/Helmeppo.png (N)
- public/images/characters/Heppoko.png (N)
- public/images/characters/Mountain Bandit.png (N)
- public/images/characters/Peppoko.png (N)
- public/images/characters/Rokkaku.png (N)
- public/images/characters/Roronoa Zoro.png (N)
- public/images/characters/Ukkari.png (N)
- src/components/Characters/Character.js
- src/components/Characters/CharacterCard.js
- src/components/Characters/Characters.css
- src/components/Characters/Characters.js (M)
- src/components/Fetch/FetchCharacters.js (M)
- src/components/Fetch/FetchFormationNPC.js
- src/components/Fetch/FetchFormationPlayer.js (M)
- src/components/Fetch/FetchFormationStage.js
- src/components/Fetch/FetchStage.js (R)
- src/components/Fetch/FetchStagesCount.js (R)
- src/components/Story/Formations/FormationNPC.js
- src/components/Story/Formations/FormationPlayer.js
- src/components/Story/PlayStage.js
- src/components/Story/SetupStage.js (N)
- src/components/Story/StageAdvanceForm.js (M)
- src/components/Story/StatusUpdates.js
- src/components/Story/Story.css
- src/components/Story/Story.js

## Version 0.5.0 (2021-08-30)

- Added images to the characters table
- Added images for the following characters:
  - Monkey D. Luffy
  - Higuma
  - Koby
  - Alvida
- Completely redesigned character cards
- Characters can now be leveled up
- Renamed "level points" to "medallions"
- Replaced rarity with tiers
- Formations will no longer be stored in the `formation` table of the database
  - The player's formation will be stored in `account`
  - The NPC's formation (for each stage) will be stored in `stages`

**Modified files:**
- public/images/characters/Alvida.png (N)
- public/images/characters/Higuma.png (N)
- public/images/characters/Koby.png (N)
- public/images/characters/Monkey D. Luffy.png (N)
- src/App.css (M)
- src/assets/Default.png (N)
- src/assets/font-awesome-rules.min.css (N)
- src/assets/font-awesome.min.css (N)
- src/assets/fonts/fa-brands.ttf (N)
- src/assets/fonts/fa-regular.ttf (N)
- src/assets/fonts/fa-solid.ttf (N)
- src/components/Account/Account.js (M)
- src/components/Characters/Character.js
- src/components/Characters/CharacterCard.js
- src/components/Characters/CharacterLevelUpForm.js (N)
- src/components/Characters/Characters.css
- src/components/Characters/Characters.js
- src/components/Fetch/FetchCharacters.js (M)
- src/components/Fetch/FetchFormationNPC.js (M)
- src/components/Fetch/FetchFormationPlayer.js (M)
- src/components/Story/PlayStage.js
- src/components/Story/StageAdvanceForm.js (M)
- src/components/Story/Story.js (M)

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