module.exports = Vertigo_Effect;

var Common = require('./Common.js');

function Vertigo_Effect() {
    this.effect_name = '晕倒了';
    this.effect_damage_name = '晕倒了,无法攻击,眩晕';
    this.effect_damage_point = 0;
    this.effect_damage_round = 2;
    this.delay_round = 2;
    this.trigger_ratio = 1/3;
}

//Common.inherit(Vertigo_Effect, Effect);

Vertigo_Effect.prototype.trigger = function(attacker) {
    var result = '';

    if(this.effect_name === '中毒了' || this.effect_name === '着火了' ) {
        if(this.delay_round >= 0) {
            result += attacker.damaged_by_weapon_effect();//李四受到2点毒性伤害,李四剩余生命：15
        }
    }
    return result;
};