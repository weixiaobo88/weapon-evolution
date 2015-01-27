module.exports = Effect;

var Common = require('./Common.js');

function Effect() {
    this.effect_name = '';
    this.effect_damage_name = '';
    this.effect_damage_point = 0;
    this.effect_damage_round = 0;
    this.delay_round = 0;
    this.trigger_ratio = 0;
}

Effect.prototype.trigger = function(attacker) {
    return attacker.damaged_by_weapon_effect();
};

