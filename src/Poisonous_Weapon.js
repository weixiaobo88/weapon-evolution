module.exports = Poisonous_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Poisonous_Effect = require('./Poisonous_Effect.js');

function Poisonous_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Poisonous_Effect();
}

Common.inherit(Poisonous_Weapon, Weapon);

Poisonous_Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return this.effect;
    }
    return '';
};

Poisonous_Weapon.prototype.effect_is_triggered = function () {
    return Common.get_random_num() < Poisonous_Weapon.trigger_ratio;
};