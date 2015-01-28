module.exports = Full_Attack_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Full_Attack_Effect = require('./Full_Attack_Effect.js');

function Full_Attack_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Full_Attack_Effect();
}

Common.inherit(Full_Attack_Weapon, Weapon);

Full_Attack_Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return this.effect;
    }
    return '';
};

Full_Attack_Weapon.prototype.effect_is_triggered = function() {
    return Common.get_random_num() < Full_Attack_Weapon.trigger_ratio;
};