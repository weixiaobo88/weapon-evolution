module.exports = Flame_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Flame_Effect = require('./Flame_Effect.js');

function Flame_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Flame_Effect();
}

Common.inherit(Flame_Weapon, Weapon);
