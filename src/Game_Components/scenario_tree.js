const scenarioTree = {
	'startVillageNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Will you help Dave?', zone, 'Yes', 'No', 'dog', null, false).setScrollFactor(0)},
	'dog': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Can you find my dog?', zone, 'OK', 'No', 'lookDog', null, false).setScrollFactor(0)},
	'lookDog': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Where do you look?', zone, 'tree', 'pond', 'tree', 'pond', false).setScrollFactor(0)},
	'tree': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'You find the dog', zone, 'continue', '', null, null, true).setScrollFactor(0)},
	'pond': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "It's a dog, not a duck", zone, 'continue', '', 'lookDog', false).setScrollFactor(0)},
	
	'startWoodNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Hey, it's been weeks since I spoke to anyone. Have you got time for a chat?", zone, 'Yes', "No, I'm busy helping people", 'lonely', null, false).setScrollFactor(0)},
	'lonely': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "*Frank talks about his problems for 20 minutes*", zone, 'Tell me more', "Sorry, I've got to go", 'chat', null, false).setScrollFactor(0)},
	'chat': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "You're such a great listener. Do you have any advice for me?", zone, 'Frank, you know what to do', 'Always wear sunscreen', 'answerWithin', 'sunscreen', false).setScrollFactor(0)},
	'answerWithin': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "You're right! My heart knew the right path all along!", zone, 'continue', '', null, null, true).setScrollFactor(0)},
	'sunscreen': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Umm, okay. I'll go to the shops and buy some. *Frank leaves, confused*", zone, 'continue', '', null, null, false).setScrollFactor(0)},
	
	'startParkNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Will you help me pick flowers?', zone, 'Yes', 'No', null, null, false).setScrollFactor(0)},
	
	
	
	
	
	'startSupermarketNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Will you help me find the soup?', zone, 'Yes', 'No', null, null, false).setScrollFactor(0)},
	
	'startOldForestNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Will you help me chop some wood?', zone, 'Yes', 'No', null, null, false).setScrollFactor(0)},
	
	'startGraveyardNPC': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Will you help me fight this ghost?', zone, 'Yes', 'No', null, null, false).setScrollFactor(0)},
  }

  export default scenarioTree;