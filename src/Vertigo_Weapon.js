module.exports = Vertigo_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');

function Vertigo_Weapon(weapon) {
    Weapon.call(this, weapon);
}

Common.inherit(Vertigo_Weapon, Weapon);

Vertigo_Weapon.effect_name = '晕倒了';
Vertigo_Weapon.effect_damage_name = '晕倒了,无法攻击,眩晕';
Vertigo_Weapon.effect_damage_point = 0;
Vertigo_Weapon.effect_damage_round = 2;
Vertigo_Weapon.delay_round = 2;
Vertigo_Weapon.trigger_ratio = 1/3;

Vertigo_Weapon.prototype.get_effect = function() {
    return {
        effect_name: Vertigo_Weapon.effect_name,
        effect_damage_name: Vertigo_Weapon.effect_damage_name,
        effect_damage_point: Vertigo_Weapon.effect_damage_point,
        effect_damage_round: Vertigo_Weapon.effect_damage_round,
        delay_round: Vertigo_Weapon.delay_round,
        trigger_ratio: Vertigo_Weapon.trigger_ratio
    };
};

Vertigo_Weapon.prototype.get_effect_name = function() {
    return Vertigo_Weapon.effect_name;
};

Vertigo_Weapon.prototype.get_effect_damage_point = function() {
    return Vertigo_Weapon.effect_damage_point;
};

Vertigo_Weapon.prototype.get_effect_damage_name = function() {
    return Vertigo_Weapon.effect_damage_name;
};

Vertigo_Weapon.prototype.get_delay_round = function() {
    return Vertigo_Weapon.delay_round;
};

Vertigo_Weapon.prototype.get_effect_left_round = function(round) {
    return Vertigo_Weapon.effect_damage_round - round - 1;
};

Vertigo_Weapon.prototype.effect_is_triggered = function () {
    return Common.get_random_num() < Vertigo_Weapon.trigger_ratio;
};

Vertigo_Weapon.prototype.effect_not_stop_attackee = function(round) {
    return round >= Vertigo_Weapon.effect_damage_round;
};

Vertigo_Weapon.prototype.effect_msg = function(attackee, attacker, round) {
    var result = '';

    if(this.effect_is_triggered()) {
        result += attackee.get_name()
                + this.get_effect_damage_name() + '还剩：' + this.get_effect_left_round(round)+ '轮\n';
    }

    return result;
};
