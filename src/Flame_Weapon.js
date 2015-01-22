module.exports = Flame_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');

function Flame_Weapon(weapon) {
    Weapon.call(this, weapon);
}

Common.inherit(Flame_Weapon, Weapon);

Flame_Weapon.effect_name = '着火';
Flame_Weapon.effect_damage_name = '火焰';
Flame_Weapon.effect_damage_point = 2;
Flame_Weapon.delay_round = 2;
Flame_Weapon.trigger_ratio = 1/3;

Flame_Weapon.prototype.get_effect_name = function() {
    return Flame_Weapon.effect_name;
};

Flame_Weapon.prototype.get_effect_damage_point = function() {
    return Flame_Weapon.effect_damage_point;
};

Flame_Weapon.prototype.get_effect_damage_name = function() {
    return Flame_Weapon.effect_damage_name;
};

Flame_Weapon.prototype.get_delay_round = function() {
    return Flame_Weapon.delay_round;
};

Flame_Weapon.prototype.effect_is_triggered = function(round) {
    return round <= this.get_delay_round();
};

Flame_Weapon.prototype.effect_msg = function(attackee, attacker, round) {
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