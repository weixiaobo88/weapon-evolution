module.exports = Frost_Effect;

var Common = require('./Common.js');

function Frost_Effect() {
    this.effect_name = '冻僵了';
    this.effect_damage_name = '冻得直哆嗦';
    this.effect_damage_point = 0;
    this.effect_damage_round = 3;
    this.delay_round = 2;
    this.trigger_ratio = 1/3;
}

Frost_Effect.prototype.trigger = function(attacker, attackee) {
    var result = '';

    --attacker.state.effect_damage_round;
    if(attacker.state.effect_damage_round === 0 || attacker.state.effect_damage_round % 3 === 0) {
        return attacker.get_name() + attacker.state.effect_damage_name + ',没有击中' + attackee.get_name() + '\n';
    }

    result += attacker.normal_msg(attackee);

    return result;
};