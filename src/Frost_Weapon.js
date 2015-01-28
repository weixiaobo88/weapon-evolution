module.exports = Frost_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Frost_Effect = require('./Frost_Effect.js');

function Frost_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Frost_Effect();
}

Common.inherit(Frost_Weapon, Weapon);
