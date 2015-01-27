module.exports = Sharp_Effect;

var Common = require('./Common.js');

function Sharp_Effect() {
    this.effect_name = '全力一击';
    this.effect_damage_name = '毒性';
    this.effect_damage_point = 6;
    this.effect_damage_round = 0;
    this.delay_round = 0;
    this.trigger_ratio = 1/3;
}

//Common.inherit(Sharp_Effect, Effect);

Sharp_Effect.prototype.trigger = function(attacker) {
    var result = '';

    if(this.effect_name === '中毒了' || this.effect_name === '着火了' ) {
        if(this.delay_round >= 0) {
            result += attacker.damaged_by_weapon_effect();//李四受到2点毒性伤害,李四剩余生命：15
        }
    }
    return result;
};