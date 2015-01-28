module.exports = Full_Attack_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Full_Attack_Effect = require('./Full_Attack_Effect.js');

function Full_Attack_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Full_Attack_Effect();
}

Common.inherit(Full_Attack_Weapon, Weapon);
