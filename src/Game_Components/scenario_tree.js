//this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end)

const scenarioTree = {
	//Dialog with NPC in village, needs Netflix ideas, this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end)
	'startVillageNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Thank goodness I found you! I have a terrible problem', zone, 'Maybe I can help', 'Sucks to be you', 'askQuestionNetflix', null, false).setScrollFactor(0)},
	'askQuestionNetflix': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "I've run out of things to watch on Netflix. I've seen everything! ", zone, 'continue', '', 'continueNetflix', null, false).setScrollFactor(0)},
	'continueNetflix': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "It's so desperate I've had to go outside. Do you have any suggestions?", zone, 'Have you tried Disney plus?', 'Have you tried Tiger King?', 'disneyPlus', 'tigerKing', false).setScrollFactor(0)},
	'tigerKing': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Of course I have! Urgh, some help you are', zone, 'continue', '', null, null, false).setScrollFactor(0)},
	'disneyPlus': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Yeah, I'd love to watch the Mandalorian, but who has the money for that?", zone, 'What about a book?', 'Um, get a job then', 'book', null, false).setScrollFactor(0)},
	'book': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "I never thought of that! I enjoyed the Witcher, maybe I'll try the book. Thanks!", zone, 'continue', '', null, null, true).setScrollFactor(0)},
	
	//Dialog with NPC in wood, sad and needs someone to listen, this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end)
	'startWoodNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Hey...", zone, 'Are you okay?', "Hi! *keep walking*", 'askQuestionSad', null, false).setScrollFactor(0)},
	'askQuestionSad': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "I'm just feeling really down today", zone, 'Do you want to talk?', "Well I'm great! Seeya!", 'talkSad', null, false).setScrollFactor(0)},
	'talkSad': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "*Frank talks about his problems for 20 minutes*", zone, 'Tell me more', "Sorry, I've got to go", 'continueTalkSad', null, false).setScrollFactor(0)},
	'continueTalkSad': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "You're such a great listener. Do you have any advice for me?", zone, 'Frank, you know what to do', 'Always wear sunscreen', 'answerWithin', 'sunscreen', false).setScrollFactor(0)},
	'answerWithin': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "You're right! My heart knew the right path all along!", zone, 'continue', '', null, null, true).setScrollFactor(0)},
	'sunscreen': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Umm, okay. I'll go to the shops and buy some. *Frank leaves, confused*", zone, 'continue', '', null, null, false).setScrollFactor(0)},
	
	//Dialog with NPC in park, needs date ideas, this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end)
	'startParkNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Hell-... OH NO, I forgot!', zone, 'What did you forget?', "Oh no! I'll leave you to it", 'askQuestionDate', null, false).setScrollFactor(0)},
	'askQuestionDate': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "I have a date with my spouse tonight and I haven't made any plans!", zone ,"I can help you make a plan!", "I guess you're getting a divorce then" , 'planDate', null, false).setScrollFactor(0)},
	'planDate': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Thank you! They love nature. Do you have any ideas?", zone ,"What about a walk in this park?", "How about a day trip to the city?" , 'goodDate', 'badDate', false).setScrollFactor(0)},
	'badDate': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Oh wow, sounds suuuuuper natural. Thanks sooooo much for your help", zone ,"continue", '' , null, null, false).setScrollFactor(0)},
	'goodDate': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Of course! The answer was right in front of me! What else could I do to make it special?", zone ,"There's a lovely spot over there for a picnic", 'You could sit on that bench and both scroll on your phones' , 'picnic', 'bench', false).setScrollFactor(0)},
	'bench': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Sounds like fun, you're such a romantic *rolls eyes*", zone ,"continue", '' , null, null, false).setScrollFactor(0)},
	'picnic': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "They'll love that! Thanks for the advice! I'm going to go pick some flowers right now", zone ,"continue", '' , null, null, true).setScrollFactor(0)},
	
	//Dialog with NPC in supermarket, overwhelmed by choice of pasta, this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end)	
	'startSupermarketNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "*muttering* Hmmmmmmmmm... *small scream* Ahh! I didn't see you there!", zone, "What's on your mind?", '*screams back*', 'askQuestionShop', 'scream', false).setScrollFactor(0)},
	'scream': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "*stares, then backs away*", zone, "continue", '', null, null, false).setScrollFactor(0)},
	'askQuestionShop': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "How can there be so many types of pasta? I need some for my tea, but I don't know which to choose", zone, "What are you cooking", "*shrug* I'm sure you'll figure it out", 'whatsForDinner', null, false).setScrollFactor(0)},
	'whatsForDinner': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Bolognese", zone, "Sounds like you need tagliatelle", "I don't like bolognese", 'tagliatelle', null, false).setScrollFactor(0)},
	'tagliatelle': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Yes, but they don't have any! *panics quietly*", zone, "You could use spaghetti instead?", "Oh well, sounds like a you problem", 'spaghetti', null, false).setScrollFactor(0)},
	'spaghetti': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Thank you! Why didn't I think of that! I feel much better now", zone, "continue", "", null, null, true).setScrollFactor(0)},
	
	//Dialog with NPC in old forest, lonely and needs a chat, this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end)
	'startOldForestNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Oh my goodness! A person! You're the first person I've seen in weeks!", zone, 'Wow, that sound tough', 'And probably the last *walk away*', 'askQuestionLonely', null, false).setScrollFactor(0)},
	'askQuestionLonely': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Yeah, I've been so lonely, can you stay for a chat?", zone, 'Of course', "No, I'm too busy helping people", 'chatLonely', 'noChat', false).setScrollFactor(0)},
	'noChat': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Oh, okay, maybe another time...", zone, 'continue', "", null, null, false).setScrollFactor(0)},
	'chatLonely': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "What shall we chat about?", zone, 'I know some great facts about trees', "covid", 'treeFacts', 'covid', false).setScrollFactor(0)},
	'covid': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Nobody wants to talk about covid", zone, 'continue', "", null, null, false).setScrollFactor(0)},
	'treeFacts': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Tell me a tree fact!", zone, 'Pine cones have a gender', "Pine trees grow on every continent", 'trueTreeFact', 'falseTreeFact', false).setScrollFactor(0)},
	'falseTreeFact': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "What about Antartica? I'm not here for your fake tree news", zone, 'continue', "", null, null, false).setScrollFactor(0)},
	'trueTreeFact': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "What a great fact! I'm going to go and find some pine cones now. Thank you!", zone, 'continue', "", null, null, true).setScrollFactor(0)},

	//Dialog with NPC in graveyard, needs a job, this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end)
	'startGraveyardNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Hello stranger! You would not believe how bored I am', zone, 'Why are you bored?', "You're right, I don't believe it", "askQuestionJob", null, false).setScrollFactor(0)},
	"askQuestionJob": function(zone) {this.createDialog(this, 2243.10344827586, 4050, "I was a balloon artist, but now nobody wants to buy my balloons so I'm out here making balloon animals for the ghosts", zone, 'What about a career change?', "I'm sure the ghosts appreciate it", "careerChange", 'ghosts', false).setScrollFactor(0)},
	"ghosts": function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Yeah, but they never remember their wallets", zone, 'What about a career change, then?', "I wish I cared", "careerChange", null, false).setScrollFactor(0)},
	"careerChange": function(zone) {this.createDialog(this, 2243.10344827586, 4050, "I could do, but I don't have any other skills. What could I do?", zone, 'Software! Northcoders can teach anyone to code!', "Airline pilot?", "northcoders", 'pilot', false).setScrollFactor(0)},
	"pilot": function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Do you have any idea how long that would take? Your advice sucks.", zone, 'continue', "", null, null, false).setScrollFactor(0)},
	"northcoders": function(zone) {this.createDialog(this, 2243.10344827586, 4050, "That's a cool idea, but doesn't learning to code take ages?", zone, 'Not with their bootcamp! Only 14 weeks!', "", "northcoders2", null, false).setScrollFactor(0)},
	"northcoders2": function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Awesome! I'll go sign up now! Thank you!", zone, 'continue', "", null, null, true).setScrollFactor(0)},
  }

  export default scenarioTree;