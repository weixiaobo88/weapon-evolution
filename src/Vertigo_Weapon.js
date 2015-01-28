module.exports = Vertigo_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Vertigo_Effect = require('./Vertigo_Effect.js');

function Vertigo_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Vertigo_Effect();
}

Common.inherit(Vertigo_Weapon, Weapon);
