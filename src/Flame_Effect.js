module.exports = Flame_Effect;

var Common = require('./Common.js');

function Flame_Effect() {
    this.effect_name = '着火了';
    this.effect_damage_name = '火焰';
    this.effect_damage_point = 2;
    this.effect_damage_round = 0;
    this.delay_round = 2;
    this.trigger_ratio = 1/3;
}

Flame_Effect.prototype.trigger = function(attacker, attackee) {
    var result = '';

    if(this.delay_round >= 0) {
        result += attacker.damaged_by_weapon_effect();//李四受到2点毒性伤害,李四剩余生命：15
    }

    result += attacker.normal_msg(attackee);

    return result;
};