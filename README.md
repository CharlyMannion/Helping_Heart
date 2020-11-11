# Final Project Game (placeholder title)

For our final project at Northcoders we built a game! Play it [here](https://nchelper.netlify.app/)

Check out our Game Design Document [here](https://github.com/CharlyMannion/final_project/blob/dev/GameDesignDocument.md)

Find the hosted back end [here](https://helpers-game-backend.herokuapp.com/playerlist)

See our back end repository [here](https://github.com/SarahBrowncross/helpers-backend)

Check out our final presentation slides [here](https://docs.google.com/presentation/d/1lK4el-vOFFCqbzQJrU31cipP5R_oQMzfXeBl4O0S5DU/edit?usp=sharing)

You can also see a video of our presentation [here]()

## Concept

Sometimes life can be tough, so wouldn’t it be nice if someone would just come up to you can solve all you problems? The core idea behind our game is positivity, we want people to have a little smile on their face when they finish, so we’re having them be the good guy we all know we can be. The player’s objective is to explore the small town we’ve designed for them. Within that town a some troubled people, the player will interact with them and help them with their problem leading to happy individual. The player character has just emerged from the end of lockdown, they haven’t seen anyone in person in months and are ready to rejoin the social world. Their heart is small due to loneliness so they’re heading out to make people happy and rebuild their heart into a healthy happy social life, they just want to feel good about themselves.

## Contributors
* [Matt Hartley](https://github.com/Tibs088)
* [Sarah Browncross](https://github.com/SarahBrowncross)
* [Matt Berry](https://github.com/MBerry97)
* [Charly Mannion](https://github.com/CharlyMannion)

## Objectives
Before getting started and settling on the idea for our final project, our team discussed and defined our objectives for the next two weeks:
* Build something that people would actually to use
* Learn Phaser
* Write clean, readable code and ensure knowledge sharing
* Follow an agile approach; daily stand-ups, check-ins and retros
* Pairing and effective team communication
* Produce a proof of concept, rather than a shiny finished app at the expense of our sanity and team collaboration
* Have fun!

## Approach
* When we had agreed our objectives, we discussed ideas for our app
* It quickly became apparent that we all wanted to build something fun, a game!
* We originally came up with 3 different game ideas, which we pitched to the Northcoders tutors
* After receiving feedback on our pitch, we decided on the idea we wanted to pursue
* We wrote user stories for our game, and added them to a trello board
* With the idea in place, we began exploring the possible technologies
* We decided to use Phaser with React, and keep the back end really simple
* The team began by spiking React and Phaser in small applications
* When we felt we had a basic understanding of the technology, we confirmed our MVP and broke down the user stories into tasks or tickets
* We began working on these tickets in pairs
* We stuck to our objectives and had daily stand-ups, check-ins retros, and knowledge sharing sessions
* We swapped pairs and tasks regularly to ensure we all had a good grasp of the application
* We mob programmed to solve any difficult problems we encountered
* We used our Trello board within our stand ups to track our progress
![Screenshot 2020-11-06 at 13 40 49](https://user-images.githubusercontent.com/28218869/98372522-caa37e80-2035-11eb-9b00-8cdcd1552c5b.png)

## Technologies Used
* Phaser
* React
* Javascript
* Tiled
* Node.js
* Jest
* Heroku
* Netlify

## Running the App locally
* Clone the repo [here](https://github.com/CharlyMannion/final_project.git): 
```
git clone https://github.com/CharlyMannion/final_project.git
```
* Go into the project directory:
```
cd final_project
```
* Open the app in your favourite text editor to view the code (We like VSCode):
```
code .
```
* To install all dependencies, in your terminal type:
```
npm i
```
* To launch the react app:
```
npm start
```

## Running Tests
```
npm test
```

## User Stories
### MVP
```
As a user, 
so I can play as myself, 
I want to see a landing page where I can enter a name

As a user, 
so I know how to play the game, 
I want to see a tutorial

As a user, 
so I can start a game, 
I want press a start button

As a user, 
so I know who I am, 
I want to see my username

As a user, 
so I know what represents me in the game, 
I want to see the avatar

As a user, 
so I know where I am, 
I want to see a map

As a user, 
so I can move around, 
I want to be able to use the keyboard arrows (or WASD)

As a user, 
so I can help people, 
I want to be able to find people to help

As a user, 
so I can help people, 
I want to be able to interact with them

As a user, 
when I interact with a person in need, 
I see a dialogue box

As a user, 
when I see a dialogue box, 
I want there to be a problem in it

As a user, 
when I see a problem, 
I want there to be option to solve the problem

As a user, 
when faced with options, 
I want to be able to select an option

As a user, 
after I select an option, 
I want to see immediate feedback on whether I chose correctly

As a user, 
once I have helped one person, 
I want to be able to go and help another

As a user, 
so I can play for a decent amount of time, 
I want to be able to help 5 people in need

As a user, 
so I know who I have already visited, 
I want there to be a visual indicator that I have tried to help them (and can't try to help them again)

As a user, 
after I have helped 5 people, 
I want the game to end

As a user, 
when the game has ended, 
I want to see the results of the game

As a user, 
I want a consistent game design
```

### Additional User Stories
```
As a user, 
so I can play again, 
I want there to be a play again button

As a user, 
if something goes wrong, 
I want to be able to quit the game

As a user, 
so I can go for a wee, 
I would like to pause the game

As a user, 
so I know that the game is paused, 
I would like to see a pause icon

As a user, 
so my game is multi-sensory, 
I want to hear action sounds

As a user, 
so my game is multi-sensory, 
I want to hear music

As a user, 
so I am not annoyed by annoying music, 
I would like to be able to mute the game

As a user, 
so I can see who else has played, 
I want to see a list of people who have finished the game
```

## Developer Stories
```
As a developer, 
I would like to create a working proof of concept

As a developer, 
I would like to better understand phaser

As a developer, 
I would like to follow Agile principles

As a developer, 
I would like to pair and mob programme

As a developer, 
I would like to explore testing phaser

As a developer, 
I would like to explore testing REACT
```

## Employer Stories
```
As a potential employer, 
I want to see a really good readme

As a potential employer, 
I want to see a hosted version of the game that 
I can play

As a potential employer, 
I want to find a link to the back-end repository of the project in the readme

As a potential employer, 
I want to find a link to the hosted version of the back-end project in the readme

As a potential employer, 
I want to follow the readme instructions to easily run the project locally

As an employer, 
I want to see clear comments that explain what is going on

As an employer, 
I want to see clear naming conventions

As an employer, 
I want to see proper TDD
```

## Week One: MVP
* By the end of week one, we were thrilled to reach our MVP! Although it's fair to say we were all absolutely knackered
* We had a really simple back end, hosted on Heroku, that kept track of usernames and scores
* Our game design document was completed
* We had a welcome page where a player could enter a username
* We had a fully completed Tile Map
* We had a sprite that could run around in our game 
* We had NCPs
* A dialog box would pop up when the player encountered each NCP
* The player could then choose whether or not help the NCP, see a visual indicator that this had happened, and the dialog box would go down
* The player could only interact with each NCP once
* Check out some screenshots of our game by the end of week 1:

* Player enters a username and presses play
<img width="1340" alt="Screenshot 2020-11-06 at 13 17 26" src="https://user-images.githubusercontent.com/28218869/98370650-cfb2fe80-2032-11eb-887c-9b3d3332c864.png">

* Player walks towards the NCP using W,A,S,D keys:
<img width="876" alt="Screenshot 2020-11-06 at 13 17 40" src="https://user-images.githubusercontent.com/28218869/98370652-d04b9500-2032-11eb-9d8c-0231998c3d77.png">

* Player enters the zone of an NCP:
<img width="506" alt="Screenshot 2020-11-06 at 13 18 08" src="https://user-images.githubusercontent.com/28218869/98370657-d2155880-2032-11eb-9791-ac12cb2623ee.png">

* Players presses the space bar, and a dialog box appears:
<img width="510" alt="Screenshot 2020-11-06 at 13 18 20" src="https://user-images.githubusercontent.com/28218869/98371504-2f5dd980-2034-11eb-97e4-774d1ea5d8dc.png">

* Player chooses whether or not to help the NCP. There is a visual indicator that a button has been clicked on the screen ("true"). The player is only able to enter the zone of each NCP once:
<img width="510" alt="Screenshot 2020-11-06 at 13 18 28" src="https://user-images.githubusercontent.com/28218869/98371430-135a3800-2034-11eb-81f0-65ed7fde7c5f.png">


## Week Two: 
* At the start of week two, we defined our second sprint, which would take us to the end of Wednesday. We decided to stop coding at this point so we could focus on tidying up and creating a really great presentation
* Our second sprint consisted of functionality to make the game both more seamless and fun to play
* A big peice of this was creating a logic tree for the scenarios to help NPCs, and implementing multiple pop-up dialogue boxes
* Other features included sound effects, music, an improved tilemap, and consistent styling throughout the game
* As part of our second sprint, we also investigated implementing a database as a potential way of storing the game logic. We spiked Firebase and made basic requests from within phaser, which proved this could be implemented. But ultimately we decided not to pursue this as it would've been a huge piece of work, which would require learning another new technology such as MongoDB
* Another part of this sprint was conducting traditional game testing, which involved each of us playing the game and recording known bugs. An issue we encountered whilst conducting these tests was collision in places were there was nothing visible to collide with
* The final part of this sprint was hosting our app on Netlify. Play it [here](https://nchelper.netlify.app/) 

## Challenges
* One of our main challenges was getting to grips with Phaser, and using it in conjunction with React. We found we were unable to pass information in and out of Phaser as props, like you would a traditional React Component. Our solution was to keep any information needed for the Phaser game within the game itself. The drawside of this solution was that we ended up with a huge and unwieldy game.jsx file. If we had more time, or could go back and design the game differently, I think we would all like to try and find a way to extract more code from our Phaser game
* Because we chose to use tech that was not part of the Nothcoders curriculum, we were unable to ask for help when we ran into problems
* We faced a few teething issues with tiled, and had to make a few iterations to get our layers loaded simultaneouslyWe also ended up with some invisible collision points in our map, which we were unable to locate the cause of
* We also came into a small amount of trouble when merging our branches, due to the fact that Phaser needs to be written in one file in order to run smoothly. However, we were able to resolve any merge conflicts quickly
* One of our goals was to create a game in which the characters would be diverse. However we really struggled to find assets to meet our goal, and we do not have the time or the skills to design our own. But we persevered with our hunt, and were able to find some eventually

## Successes
* Being unable to ask for help with using Phaser greatly improved our problem-solving and de-bugging skills
* We all felt a huge sense of achievement when we got Phaser working, and celebrated our success as a team
* We were great at swapping pairs, having regular knowledge-sharing sessions. This meant we all got the opportunity on different aspects of the game, and it felt like we had a really great understanding of how our app was working
* One of our main objectives was to build something that we would enjoy working on. We all really enjoyed working on this game, and remained enthusiastic throughout the two weeks, so this was a huge success
* I think it’s also safe to say that we’re all really proud of our game, from the map to the game plot. 