//import express js
const express = require('express');
//create express app object
const app = express()

app.set("view engine", "ejs");
//global variables

class GameMatch {
  constructor() {
    this.id = gameList.length + 1000;
    this.turn = 0; // index of this.player whose turn it is
    this.players = [];
    this.round = 0;
  }
}


class Character {
  constructor(name, race, CharacterClass) {
  this.id = characterList.length + 1000;
  this.name = name
  this.race = race
  this.CharacterClass = CharacterClass
  this.equipment = {
    head: {},
    chest: {},
    legs: {},
    arm_p: {},
    arm_s: {},
    two_handed:{}
  }
  this.inventory = []
  this.abilities = []
  this.stats = {
  attack:5,
  defense:6,
  speed: 5,
  hp_current:20,
  hp_max:20,
}
  this.pickupItem = function(searchName)  {
    for (var item of equipment_list) {
      console.log(item.name)
      if (item.name == searchName) {
        console.log('found match')
        this.inventory.push(item)
        break;
      }
    }
  }
  this.unequipItem = function(slot) {
    for (var slotName in this.equipment) {
      console.log(slotName)
      if (slotName == slot) {
        console.log('found item slot, removing')
        this.equipment.slotName = {}
        }
      }
    }
  }
}


//holds all possible items
var equipment_list = [
  {name: 'Longsword',
   slot: 'two_handed',
   bonuses: {
     defense: 5,
     attack: 5
   }
 },
{
  name: 'shield',
   slot: 'arm_s',
   bonuses: {
     defense: 5
   }
 },
];




//create character list with two default characters
var gameList = [];
var characterList = [];
characterList.push(new Character('Jack', 'Human', 'Knight'))
characterList.push(new Character('Black', 'Human', 'Knight'))

for (var character of characterList) {
  character.pickupItem('Longsword')

  }
//Get endpoint for game
app.get('/game', (req, res) => {
  // search for game in gamelist
    var foundGame = gameList.find(game => game.id == req.query.gameid)
    // if game was found, we can manipulate it
    if (foundGame) {
      // check to see if the user sent the add character query param "&addcharacter=xxx"
      if (req.query.addcharacter) {
        // check to see if there is room in this games playlist to add a character
        if (foundGame.players.length < 2) {
          // find the character with the given addcharacter id
          var foundProfile = characterList.find(character => character.id == req.query.addcharacter)
          // if the character exist add its id to this games playerlist
          if (foundProfile) {
            foundGame.players.push(foundProfile.id)
          }
        }
      }

      res.render('game', {
        sendData: foundGame
    })
  } else {
    res.redirect('/newgame')
  }
});

app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch());
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)
});

//creates get endpoint
app.get('/profile', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.query.characterid)
  if (foundProfile) {
  //renders template called profile from the views folder
  res.render('profile', {
    sendData: foundProfile
  })
} else {
  res.redirect('/newprofile')
}
});

//this endpoint makes a new character
app.get('/newprofile', (req, res) => {
  characterList.push(new Character('James', 'human', 'conqueror'))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)
});
//starts an http listen server
app.listen(3000);
