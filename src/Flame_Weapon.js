module.exports = Flame_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Flame_Effect = require('./Flame_Effect.js');

function Flame_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Flame_Effect();
}

Common.inherit(Flame_Weapon, Weapon);

Flame_Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return this.effect;
    }
    return '';
};

Flame_Weapon.prototype.effect_is_triggered = function() {
    return Common.get_random_num() < Flame_Weapon.trigger_ratio;
};