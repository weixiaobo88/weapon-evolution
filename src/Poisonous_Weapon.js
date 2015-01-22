module.exports = Poisonous_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');

function Poisonous_Weapon(weapon) {
    Weapon.call(this, weapon);
}

Common.inherit(Poisonous_Weapon, Weapon);

Poisonous_Weapon.effect_name = '中毒';
Poisonous_Weapon.effect_damage_name = '毒性';
Poisonous_Weapon.effect_damage_point = 2;
Poisonous_Weapon.delay_round = 2;
Poisonous_Weapon.trigger_ratio = 1/3;

Poisonous_Weapon.prototype.get_effect_name = function() {
    return Poisonous_Weapon.effect_name;
};

Poisonous_Weapon.prototype.get_effect_damage_point = function() {
    return Poisonous_Weapon.effect_damage_point;
};

Poisonous_Weapon.prototype.get_effect_damage_name = function() {
    return Poisonous_Weapon.effect_damage_name;
};

Poisonous_Weapon.prototype.get_delay_round = function() {
    return Poisonous_Weapon.delay_round;
};

Poisonous_Weapon.prototype.effect_is_triggered = function(round) {
    return round <= this.get_delay_round();
};

Poisonous_Weapon.prototype.effect_msg = function(attackee, attacker, round) {
    var result = '';

    if(this.effect_is_triggered(round)) {
        attackee.damaged_by_weapon(this.get_effect_damage_point());
        result += attackee.get_name() + '受到'
                + this.get_effect_damage_point() + '点'
                + this.get_effect_damage_name() + '伤害,'
                + attackee.get_left_health_point();
    }

    return result;
};