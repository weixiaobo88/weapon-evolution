module.exports = Poisonous_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Poisonous_Effect = require('./Poisonous_Effect.js');

function Poisonous_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Poisonous_Effect();
}

Common.inherit(Poisonous_Weapon, Weapon);
