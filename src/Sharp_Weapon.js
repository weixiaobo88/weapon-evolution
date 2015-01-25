module.exports = Sharp_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');

function Sharp_Weapon(weapon) {
    Weapon.call(this, weapon);
}

Common.inherit(Sharp_Weapon, Weapon);

Sharp_Weapon.effect_name = '全力一击';
Sharp_Weapon.effect_damage_name = '毒性';
Sharp_Weapon.effect_damage_point = 6;
Sharp_Weapon.trigger_ratio = 1/3;

Sharp_Weapon.prototype.get_effect = function() {
    //random triggered commented
    if(this.effect_is_triggered()) {
        return {
            effect_name: Sharp_Weapon.effect_name,
            effect_damage_name: Sharp_Weapon.effect_damage_name,
            effect_damage_point: Sharp_Weapon.effect_damage_point,
            trigger_ratio: Sharp_Weapon.trigger_ratio
        };
    }
    return '';
};

//Sharp_Weapon.prototype.get_name = function() {
//    return Sharp_Weapon.effect_name;
//};

Sharp_Weapon.prototype.effect_is_triggered = function() {
    return Common.get_random_num() < Sharp_Weapon.trigger_ratio;
};
