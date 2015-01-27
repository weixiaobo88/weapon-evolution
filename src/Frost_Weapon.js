module.exports = Frost_Weapon;

var Common = require('./Common.js');
var Weapon = require('./Weapon.js');

function Frost_Weapon(weapon) {
    Weapon.call(this, weapon);
}

Common.inherit(Frost_Weapon, Weapon);

Frost_Weapon.effect_name = '冻僵了';
Frost_Weapon.effect_damage_name = '冻得直哆嗦';
Frost_Weapon.effect_damage_point = 0;
Frost_Weapon.effect_damage_round = 3;
Frost_Weapon.delay_round = 2;
Frost_Weapon.trigger_ratio = 1/3;

Frost_Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return {
            effect_name: Frost_Weapon.effect_name,
            effect_damage_name: Frost_Weapon.effect_damage_name,
            effect_damage_point: Frost_Weapon.effect_damage_point,
            delay_round: Frost_Weapon.delay_round,
            trigger_ratio: Frost_Weapon.trigger_ratio,
            effect_damage_round: Frost_Weapon.effect_damage_round
        };
    }
    return '';
};

Frost_Weapon.prototype.get_effect_name = function() {
    return Frost_Weapon.effect_name;
};

Frost_Weapon.prototype.get_effect_damage_point = function() {
    return Frost_Weapon.effect_damage_point;
};

Frost_Weapon.prototype.get_effect_damage_name = function() {
    return Frost_Weapon.effect_damage_name;
};

Frost_Weapon.prototype.get_delay_round = function() {
    return Frost_Weapon.delay_round;
};

Frost_Weapon.prototype.effect_is_triggered = function() {
    return Common.get_random_num() < Frost_Weapon.trigger_ratio;
};

Frost_Weapon.prototype.effect_not_stop_attackee = function(round) {
    return round != Frost_Weapon.effect_damage_round;
};

Frost_Weapon.prototype.effect_msg = function(attackee, attacker, round) {
    var result = '';

    if (round % Frost_Weapon.effect_damage_round === 0) {
        result += attackee.get_name()
                + this.get_effect_damage_name() + ',没有击中' + attacker.get_name() + '\n';
    }

    return result;
};