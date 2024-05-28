module.exports = Poisonous_Effect;

function Poisonous_Effect() {
    this.effect_name = '中毒了';
    this.effect_damage_name = '毒性';
    this.effect_damage_point = 2;
    this.effect_damage_round = 0;
    this.delay_round = 2;
    this.trigger_ratio = 1/3;
}

Poisonous_Effect.prototype.trigger = function(attacker, attackee) {
    var result = '';

    if(this.delay_round >= 0) {
        result += attacker.damaged_by_weapon_effect();
    }

    result += attacker.build_attack_msg(attackee);

    return result;
};