module.exports = Vertigo_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Vertigo_Effect = require('./Vertigo_Effect.js');

function Vertigo_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Vertigo_Effect();
}

Common.inherit(Vertigo_Weapon, Weapon);

Vertigo_Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return this.effect;
    }
    return '';
};

Vertigo_Weapon.prototype.effect_is_triggered = function () {
    return Common.get_random_num() < Vertigo_Weapon.trigger_ratio;
};