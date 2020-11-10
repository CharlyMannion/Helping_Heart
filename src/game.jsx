import React, { Component } from "react";
import Phaser from "phaser";
import tileSetRPG from './assets/RPGpack_sheet.png'
import tileSetGraveYard from './assets/TilesetGraveyard.png'
import tileSetForest from './assets/top-down-forest-tileset.png'
import map from './assets/Game map.json'
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"; // Plug-in for pop up
import scenarioTree from "./Game_Components/scenario_tree"
import { navigate } from '@reach/router';

class NPCGameObject extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "npc");
  }
}

class NPCPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject("npc", this.createNPC);
  }

  createNPC(x, y) {
    return this.displayList.add(new NPCGameObject(this.scene, x, y));
  }
}

class Game extends Component {

  componentDidMount() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 700,
      height: 500,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      parent: "game-container",
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update,
      },
      plugins: {
        global: [{ key: "NPCPlugin", plugin: NPCPlugin, start: true }],
        // Set up REX UI for pop-ups and dialog
        scene: [
          {
            key: "rexUI",
            plugin: UIPlugin,
            mapping: "rexUI",
          },
        ],
      },
    });
    this.player = null;
    this.cursors = null;
    this.camera = null;
    this.controls = null;
    this.score = null;
    this.scoreDisplay = null;
    this.currentZone = null;
  }

  render() {
    return (
      <div className="game-container">
        <h1>NC Helper!</h1>
        <h2>{this.props.name}</h2>
        
      </div>
    );
  }

  preload() {
   

   this.load.image('tilesetRPG', tileSetRPG);
   this.load.image('tilesetGraveyard', tileSetGraveYard)
   this.load.image('tilesetForest', tileSetForest)
   this.load.tilemapTiledJSON('map', map);
    this.load.spritesheet("dude", "https://i.imgur.com/0x8P9a6.png", {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet('npc', 'https://i.imgur.com/0x8P9a6.png', { frameWidth: 16, frameHeight: 24 })
    this.load.scenePlugin(
      //Loads plugin
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );
  }

  create() {

            
            

    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    // Set default variables
    let overlapping = false;
    let dialog = undefined;
    // creating the layers of the map
  const addTilesetRPG = map.addTilesetImage('RPG map', 'tilesetRPG');
  const addGraveyard = map.addTilesetImage('graveyard', 'tilesetGraveyard')
  const addOldForest = map.addTilesetImage('top-down-forest-tileset', 'tilesetForest')
  const outskirts = map.createStaticLayer('Floor outskirts' , addTilesetRPG, 0, 0);
  const outskirtTrees = map.createStaticLayer('Floor outskirts trees' , addTilesetRPG, 0, 0);
  const floorLayer = map.createStaticLayer('Floor', addTilesetRPG, 0, 0);
  const floorLayer2 = map.createStaticLayer('Floor Old forest', addOldForest, 0, 0);
  const floorLayer3 =  map.createStaticLayer('Floor Graveyard', addGraveyard, 0, 0);
  const rpgCollision = map.createStaticLayer('Collision', addTilesetRPG, 0, 0);
  const oldForestCollision = map.createStaticLayer('Collision Old forest', addOldForest, 0, 0);
  const graveyardCollision = map.createStaticLayer('Collision Graveyard', addGraveyard, 0, 0);
  const graveyardCollisionForest = map.createStaticLayer('Collision Graveyard forest-set', addOldForest, 0, 0);
  const houseBricks = map.createStaticLayer('House bricks', addTilesetRPG, 0, 0);
  const forestHouse = map.createStaticLayer('Forest house', addTilesetRPG, 0, 0);
  const forestHouseFeatures = map.createStaticLayer('Forest house features', addTilesetRPG, 0, 0);
  const decoration = map.createStaticLayer('Decoration', addGraveyard, 0, 0);

  //seting the collision property of certain created layer to true
  rpgCollision.setCollisionByProperty({ collides: true });
  oldForestCollision.setCollisionByProperty({ collides: true });
  graveyardCollision.setCollisionByProperty({ collides: true });
  graveyardCollisionForest.setCollisionByProperty({ collides: true });
  forestHouseFeatures.setCollisionByProperty({ collides: true });
  decoration.setCollisionByProperty({ collides: true });
  houseBricks.setCollisionByProperty({ collides: true });
  outskirtTrees.setCollisionByProperty({ collides: true });

    //adding sprite locations
     const spriteLocation = (objectName) => {
     return map.findObject(
      "Objects",
      (obj) => obj.name === objectName
    );
   }  

    const spawnPoint = spriteLocation('Spawn Point')
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    const villageSpawn = spriteLocation('Villiage NPC')

    const forestSpawn = spriteLocation('Forest NPC')

    const parkSpawn = spriteLocation('Park NPC')

    const supermarketSpawn = spriteLocation('Supermarket NPC')
    
    const oldForestSpawn = spriteLocation('Old forest NPC')

    const graveyardSpawn = spriteLocation('Graveyard NPC')
    
    //camera to follow sprite
    const camera = this.cameras.main;
    camera.startFollow(this.player);

    //adding collision to the player sprite in relation to each layer
  this.physics.add.collider(this.player, rpgCollision)
  this.physics.add.collider(this.player, oldForestCollision)
  this.physics.add.collider(this.player, graveyardCollision)
  this.physics.add.collider(this.player, graveyardCollisionForest)
  this.physics.add.collider(this.player,forestHouseFeatures)
  this.physics.add.collider(this.player, decoration) 
  this.physics.add.collider(this.player, houseBricks)
  this.physics.add.collider(this.player, outskirtTrees)

    //creating cursors to move
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      spaceBar: Phaser.Input.Keyboard.KeyCodes.SPACE,
      tab: Phaser.Input.Keyboard.KeyCodes.TAB,
    });

    //animations
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("dude", { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    //Create NPCs
    let spriteDave = this.add.npc(villageSpawn.x, villageSpawn.y);
    this.zoneDave = this.add
      .zone(villageSpawn.x, villageSpawn.y)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneDave);

    let spriteFrank = this.add.npc(forestSpawn.x , forestSpawn.y);
    this.zoneFrank = this.add
      .zone(forestSpawn.x, forestSpawn.y)
      .setSize(75, 75);
    this.physics.world.enable(this.zoneFrank);

    let spriteJimmy = this.add.npc(parkSpawn.x, parkSpawn.y)
    this.zoneJimmy = this.add.zone(parkSpawn.x, parkSpawn.y).setSize(75, 75)
    this.physics.world.enable(this.zoneJimmy)

    let spriteSammy = this.add.npc(supermarketSpawn.x, supermarketSpawn.y)
    this.zoneSammy = this.add.zone(supermarketSpawn.x, supermarketSpawn.y).setSize(75, 75)
    this.physics.world.enable(this.zoneSammy)

    let spriteJohn = this.add.npc(oldForestSpawn.x, oldForestSpawn.y)
    this.zoneJohn = this.add.zone(oldForestSpawn.x, oldForestSpawn.y).setSize(75, 75)
    this.physics.world.enable(this.zoneJohn)

    let spriteBen = this.add.npc(graveyardSpawn.x, graveyardSpawn.y)
    this.zoneBen = this.add.zone(graveyardSpawn.x, graveyardSpawn.y).setSize(75, 75)
    this.physics.world.enable(this.zoneBen)

    //below is where result of clicking button will be added to
    this.print = this.add.text(this.player.x, this.player.y, "CLICKED?");

    // adds a label that holds each option "button"
    let createButton = function (scene, text, name) {
      if(text !== ''){
        return scene.rexUI.add.label({
          background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
          text: scene.add.text(0, 0, text, {
            fontSize: "12px",
          }),
          name: name
        });
      }
      else{
        return scene.rexUI.add.label({
          background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xf57f17),
          text: scene.add.text(0, 0, text, {
            fontSize: "12px",
          }),
          name: name
        });
      }
      
    
    };

    this.player.on("overlapstart", function () {
      this.body.debugBodyColor = 0xff3300;
      overlapping = true;
      // console.log("overlap start");
      console.time("overlap");
      
    });
    this.player.on("overlapend", function () {
      this.body.debugBodyColor = 0x00ff33;
      overlapping = false;
      // console.log("overlap end");
      console.timeEnd("overlap");
    });

    this.physics.add.overlap(this.player, this.zone);
    // Adds overlap functionality to the NPC zones
    this.physics.add.overlap(this.player, this.zoneFrank);
    this.physics.add.overlap(this.player, this.zoneDave);

    // Score and Winning
    // Set up the score variable and display that to the screen
    this.score = 0;
    this.scoreDisplay = this.add
      .text(0, 0, `score: ${this.score}`, { fontSize: "32px" })
      .setScrollFactor(0);
    // Run this Function to increase score by one then check if the score has reached 5 or not
    const updateScore = () => {
      this.score += 1;
      this.scoreDisplay.setText(`score: ${this.score}`);
      if (this.score === 5) {
        this.finishGame();
      }
    };
    // Run this fucntion to end the game
    this.finishGame = () => {
      this.physics.pause();
      this.player.setTint(0xff0000);
      navigate('/end');
      this.sys.game.destroy(true);
    };

    // creates a dialog box with buttons inside it
    this.createDialog = (scene, x, y, scenarioText, zone, buttonText1, buttonText2, nextScenario1, nextScenario2, end) => {
      let dialog = scene.rexUI.add
        .dialog({
          x: x,
          y: y,
          background: scene.rexUI.add.roundRectangle(
            0,
            0,
            100,
            100,
            20,
            0xf57f17
          ),
          title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(
              0,
              0,
              100,
              40,
              20,
              0xbc5100
            ),
            text: scene.add.text(0, 0, scenarioText, {
              fontSize: "14px",
            }),
          }),
          // calls createButton to make two labels within dialog box
          actions: [createButton(this, buttonText1, 'b1'), createButton(this, buttonText2, 'b2')],
          actionsAlign: "left",
          space: {
            title: 30,
            action: 50,
            left: 15,
            right: 15,
            top: 10,
            bottom: 10,
          },
        })
        // when you click a "button" i.e. a label, it adds text to the page
        .on(
          "button.click",
          function (button, groupName, index, pointer, event) {
            this.print.text += "\n true \n";
            // when you click on a "button", the dialog box should disappear
              if(button.name === 'b1'){
                if(nextScenario1 !== null) {
                scenarioTree[nextScenario1].call(this, zone)
                }
              }
              if(button.name === 'b2'){
                if(nextScenario2 !== null) {
                scenarioTree[nextScenario2].call(this, zone)
                }
              }
            dialog.scaleDownDestroy(100);
            if(end){
              updateScore();
              zone.destroy();
            }
          },
          this
        )
        // below makes the "button" change in appearance when the cursor hovers over it
        .on("button.over", function (button, groupName, index, pointer, event) {
          button.getElement("background").setStrokeStyle(1, 0xffffff);
        })
        .on("button.out", function (button, groupName, index, pointer, event) {
          button.getElement("background").setStrokeStyle();
        })
        .layout()
        .pushIntoBounds()
        .popUp(500);
      return dialog;
    };

    // interact function allows a dialog box to be created only if the sprite and zone are overlapping
    this.interact = (zone) => {
   
      if (overlapping && dialog === undefined) {
        if (zone === this.zoneDave) {
        scenarioTree.startDave.call(this, zone)

        } else if (zone === this.zoneFrank) {
          scenarioTree.startFrank.call(this, zone)
        }
        // conditional logic below appears to be unecessary
        // } else if (dialog !== undefined) {
        //   dialog.scaleDownDestory(100);
        //   dialog = undefined;
        //   // console.log("popdown");
      }
    };
  }

  update() {
    //Change Animations
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("down", true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      // this.player.anims.play('turn');
    }
    this.player.body.velocity.normalize().scale(200);

    let getZone = () => {
      if (this.zoneDave.body && !this.zoneDave.body.touching.none) {
        return this.zoneDave;
      } else if (this.zoneFrank.body && !this.zoneFrank.body.touching.none) {
        return this.zoneFrank;
      }
    };

    // if the space bar is down, call the interact function, which pops up the dialog box    
    if (this.cursors.spaceBar.isDown) {
      this.interact(this.currentZone);
    }
    if (this.cursors.tab.isDown) {
      this.removeDialog();
    }

    // adds logic so phaser knows when the spirte touches the zone
    if (this.player.body.embedded) {
      this.player.body.touching.none = false;
    }
    let touching = !this.player.body.touching.none;
    let wasTouching = !this.player.body.wasTouching.none;

    if (touching && !wasTouching) {
      this.player.emit("overlapstart");
      this.currentZone = getZone();
    } else if (!touching && wasTouching) {
      this.player.emit("overlapend");
      
    }

    
  }
}

export default Game;



