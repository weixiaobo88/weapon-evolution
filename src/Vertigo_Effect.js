module.exports = Vertigo_Effect;

function Vertigo_Effect() {
    this.effect_name = '晕倒了';
    this.effect_damage_name = '晕倒了,无法攻击,眩晕';
    this.effect_damage_point = 0;
    this.effect_damage_round = 2;
    this.delay_round = 2;
    this.trigger_ratio = 1/3;
}

Vertigo_Effect.prototype.trigger = function(attacker, attackee) {
    var result = '';

    if(--this.effect_damage_round >= 0) {
        return attacker.get_name() + this.effect_damage_name + '还剩：' + this.effect_damage_round + '轮\n';
    }

    result += attacker.build_attack_msg(attackee);

    return result;
};