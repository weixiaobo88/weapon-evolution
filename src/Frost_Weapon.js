module.exports = Frost_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Frost_Effect = require('./Frost_Effect.js');

function Frost_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Frost_Effect();
}

Common.inherit(Frost_Weapon, Weapon);

Frost_Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return this.effect;
    }
    return '';
};

Frost_Weapon.prototype.effect_is_triggered = function() {
    return Common.get_random_num() < Frost_Weapon.trigger_ratio;
};