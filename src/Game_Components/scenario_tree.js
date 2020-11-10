const scenarioTree = {
	'startDave': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Will you help Dave?', zone, 'Yes', 'No', 'dog', null, false).setScrollFactor(0)},
	'dog': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Can you find my dog?', zone, 'OK', 'No', 'lookDog', null, false).setScrollFactor(0)},
	'lookDog': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Where do you look?', zone, 'tree', 'pond', 'tree', 'pond', false).setScrollFactor(0)},
	'tree': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'You find the dog', zone, 'continue', '', null, null, true).setScrollFactor(0)},
	'pond': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "It's a dog, not a duck", zone, 'continue', '', 'lookDog', false).setScrollFactor(0)},
	'startFrank': function(zone) {this.createDialog(this, 2243.10344827586, 4050, 'Will you help Frank?', zone, 'Yes', 'No', 'lonely', null, false).setScrollFactor(0)},
	'lonely': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "I haven't seen anybody in weeks, will you chat to me?", zone, 'Yes', 'No', 'chat', null, false).setScrollFactor(0)},
	'chat': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "What do you chat to Frank about?", zone, 'Your rock collection', 'Covid', 'rocks', 'covid', false).setScrollFactor(0)},
	'rocks': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Frank likes rocks, he's cheered right up", zone, 'continue', '', null, null, true).setScrollFactor(0)},
	'covid': function(zone) {this.createDialog(this, 2243.10344827586, 4050, "Nobody likes covid. Frank is still sad", zone, 'continue', '', null, null, false).setScrollFactor(0)},
  }

  export default scenarioTree;