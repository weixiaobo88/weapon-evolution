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

//Common.inherit(Full_Attack_Effect, Effect);

Full_Attack_Effect.prototype.trigger = function(attacker, attackee) {
    var injured_point = attacker.get_weapon_effect().effect_damage_point * 3;
    attackee.health_point -= injured_point;

    return attacker.get_career() + attacker.get_name()
        + attacker.use_weapon()
        + '攻击了'
        + attackee.get_career() + attackee.get_name() + ','
        + attacker.get_name() + '发动了' + attacker.get_weapon_effect().effect_name + ','
        + attackee.get_name() + '受到了' + injured_point + '点伤害,'
        + attackee.get_left_health_point();
};