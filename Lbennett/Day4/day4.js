//import express js
const express = require('express');
//create express app object
const app = express()

app.set("view engine", "ejs");
//global variables

class protag {
  constructor(name, race, protagClass) {
  this.id = protagList.length + 1000;
  this.name = name
  this.race = race
  this.protagClass = protagClass
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

var protagList = []
protagList.push(new protag('Jack', 'Human', 'Knight'))

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


/*if (protag.equipment.two_handed) {
  protag.equipment.arm_p = {}
  protag.equipment.arm_s = {}
}*/
protagList[0].pickupItem('Longsword')
protagList[0].unequipItem('two_handed')
//creates get endpoint
app.get('/profile/:protagid', (req, res) => {
  console.log(req.params.protagid)

  var foundProfile = protagList.find(protag => protag.id == req.params.protagid)
  console.log(foundProfile)


  if (foundProfile) {


  //renders template called profile from the views folder
  res.render('profile', {sendData: foundProfile})
} else {
  res.redirect('/new')
}
});

//this endpoint makes a new protag
app.get('/new', (req, res) => {
  protagList.push(new protag('James', 'human', 'conqueror'))
  res.redirect('/profile/' + protagList[protagList.length - 1].id)
})
//starts an http listen server
app.listen(1000)
