module.exports = Full_Attack_Effect;

var Common = require('./Common.js');

function Full_Attack_Effect() {
    this.effect_name = '全力一击';
    this.effect_damage_name = '毒性';
    this.effect_damage_point = 6;
    this.effect_damage_round = 0;
    this.delay_round = 0;
    this.trigger_ratio = 1/3;
}

Full_Attack_Effect.prototype.trigger = function(attacker, attackee) {
    return attacker.normal_msg(attackee);
};