module.exports = Sharp_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');
var Sharp_Effect = require('./Sharp_Effect.js');

function Sharp_Weapon(weapon) {
    Weapon.call(this, weapon);
    this.effect = new Sharp_Effect();
}

Common.inherit(Sharp_Weapon, Weapon);

Sharp_Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return this.effect;
    }
    return '';
};

Sharp_Weapon.prototype.effect_is_triggered = function() {
    return Common.get_random_num() < Sharp_Weapon.trigger_ratio;
};

//Sharp_Weapon.prototype.get_name = function() {
//    return Sharp_Weapon.effect_name;
//};

//random triggered commented
//Sharp_Weapon.effect_name = '全力一击';
//Sharp_Weapon.effect_damage_name = '毒性';
//Sharp_Weapon.effect_damage_point = 6;
//Sharp_Weapon.trigger_ratio = 1/3;
