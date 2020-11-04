# Helper Game - Game Design Document

## Concept
Sometimes life can be tough, so wouldn’t it be nice if someone would just come up to you can solve all you problems? The core idea behind our game is positivity, we want people to have a little smile on their face when they finish, so we’re having them be the good guy we all know we can be.
The player’s objective is to explore the small town we’ve designed for them. Within that town a some troubled people, the player will interact with them and help them with their problem leading to happy individual.
The player character has just emerged from the end of lockdown, they haven’t seen anyone in person in months and are ready to rejoin the social world. Their heart is small due to loneliness so they’re heading out to make people happy and rebuild their heart into a healthy happy social life, they just want to feel good about themselves.

## Intro/Tutorial
The tutorial will walk the player through the controls of walking, talking to NPCs and introduces player to the core concept of making people feel better.
Asks you what your name is, either in Phaser or on the React page beforehand. Once in the game there’s another character that asks you to walk unto them and talk to them.

## Gameplay
* Exploration - Moving around the map to find all the people who need your help, some maybe hidden away so exploring the whole map is important. Objects such as buildings, tree, etc will have collision forcing the player to explore around these obstacles.
* Interaction - When someone who needs your help has been found the player can approach them and interact to trigger dialogue. You can only interact with the character when you’re within trigger range and if the NPC hasn’t been helped yet, indicated by a crying sprite, if they have been helped there is a happy sprite.
* Dialogue - When interacting a dialogue box will pop up, and you can solve the problem by selecting options in the dialogue box, if you succeed the sprite becomes happy if you fail then you have to try again. You work your way through a tree of dialogue options to help them out, akin to a text adventure game.
* Win State (Finish helping everybody) - Once everyone has been helped then the game will let you know with a pop up that you’re a good person and you will be added to the leaderboard of good people. If we have time we would like to add a little cutscene where all the people you helped turn up to thank you.

## Controls
WASD/Arrow Keys - Movement, W for up Y axis, S for down Y axis, A for left on the X axis, D for right on the X axis. Can also be used to control the dialogue options in the pop ups.
F - Interact - Interact with game objects that have been designated as objects to be interacted with. Also used to select dialogue in the pop ups.
Mouse Left Click - Clicking on the dialogue options in the dialogue pop ups.

## Level Design
The level design has a seperate paint file

## Visuals 
Simple gameboy colour style sprite art in the vein of Pokemon or Legend of Zelda. To keep things simple and quick the player sprite will have a walk animation of about 3 or 4 frames for walking left to right then another 3 or 4 for walking up and down. For the NPC’s we’ll be helping a simple 2 frame crying animation and then a 2 frame happy animation will be all that is needed.
The pop ups the font will be 8 bit in keeping with the pixel art of the game, and that text is written to the screen in real time, and once that pop up box fills up then you can click a little flashing arrow for more text. The buttons will also highlight when hovered over to indicate to the player that these are buttons to be pressed and when clicked the player will receive a little description of how they did.

## UI
Top right, 5 character heads to indicate how many people have been helped and how many are left. Crying before, happy after.
A heart which grows a bit bigger after each NPC helped.

## Sound & Music
* Sound Effects
Audio feedback when you finish a task and gain a heart. An audio snippet for when you interact with someone and the pop box appears. Clicking sounds for the option in the menu. Bad audio for when you fail. Footsteps would be nice to have. A little audio snippet for when the game starts.
* Music
This isn’t MVP, but for background music we imagine would be chip tune music in the style of old super Mario.