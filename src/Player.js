module.exports = Player;

var Common = require('./Common.js');

function Player(player) {
    this.name = player.name;
    this.health_point = player.health_point;
    this.attack_point = player.attack_point;
    this.defence_point = player.defence_point;
    this.state = {};
}

Player.career = '普通人';

Player.prototype.get_career = function() {
    return Player.career;
};

Player.prototype.is_alive = function() {
    return this.health_point > 0;
};

Player.prototype.get_name = function() {
    return this.name;
};

Player.prototype.get_total_attack_point = function() {
    return this.attack_point;
};

Player.prototype.get_defence_point = function() {
    return 0;
};

Player.prototype.use_weapon = function() {
    return '';
};

Player.prototype.get_weapon_name = function() {
    return '';
};

Player.prototype.update_state = function(state) {
    if(!this.has_state()) {
        this.state = state;
    }

    if(!Common.has_same_value(this.state, state)) {
        this.state.add(state);
    }

};

Player.prototype.get_weapon_effect = function() {
    return '';
};

Player.prototype.damaged_by_weapon_effect = function() {
    this.health_point -= this.state.effect_damage_point;

    return this.get_name() + '受到'
        + this.state.effect_damage_point + '点'
        + this.state.effect_damage_name + '伤害,'
        + this.get_left_health_point_msg();
};

Player.prototype.has_state = function() {
    return !Common.is_empty(this.state);
};

Player.prototype.attack = function (attackee) {
    var attacker = this;

    var attacker_weapon_effect = attacker.get_weapon_effect();

    if(attacker_weapon_effect) {
        var state = attacker_weapon_effect.trigger();
        attackee.update_state(state);
    }

    if(attacker.has_state()) {
        return attacker.state.trigger(attacker, attackee);
    }

    return this.build_attack_msg(attackee, attacker_weapon_effect);
};

Player.prototype.do_attack = function(attackee) {
    var state = this.state;
    if(state.has_no_left_round()) {
        return this.attack(attackee);
    }

    var happened_code = state.happened();
    if(happened_code){
        var impact_string = state.impact(this)
        if(happened_code.is_jump()){
            return impact_string;
        }else{
            return impact_string + this.attack(attackee);
        }

    }



};

Player.prototype.build_attack_msg = function(attackee, attacker_weapon_effect) {
    var attacker = this;

    return attacker.attack_opponent_msg(attackee)
    + attacker.trigger_full_attack_msg(attacker_weapon_effect)
    + attackee.get_damage_msg(attacker)
    + attackee.get_injured_by_weapon_effect_msg()
    + attackee.get_left_health_point_msg();
};


Player.prototype.get_left_health_point_msg = function() {
    return this.name + '剩余生命：' + this.health_point + '\n';
};

Player.prototype.attack_opponent_msg = function(attackee) {
    var attacker = this;

    return attacker.get_career() + attacker.get_name()
            + attacker.use_weapon()
            + '攻击了'
            + attackee.get_career() + attackee.get_name() + ',';
};

Player.prototype.get_damage_msg = function(attacker) {
    var attackee = this;
    var attackee_injured_point = attacker.get_total_attack_point() - attackee.get_defence_point();

    if(attackee.state.effect_name == '全力一击') {
        attackee_injured_point *= 3;
    }

    attackee.health_point -= attackee_injured_point;

    return attackee.get_name() + '受到了' + attackee_injured_point + '点伤害,'
};

//using one 'return' and one 'variable'
//or using multiple 'return' and no 'variable'
Player.prototype.trigger_full_attack_msg = function(attacker_weapon_effect) {
    var attacker = this;
    var result = '';

    if(attacker_weapon_effect && attacker.get_weapon_name() === '利剑') {
        result = attacker.get_name() + '发动了' + attacker_weapon_effect.effect_name + ','
    }

    return result;
};

Player.prototype.get_injured_by_weapon_effect_msg = function() {
    var result = '';

    if(this.has_state()) {
        if(this.state.delay_round-- > 0) {
            result = this.get_name() + this.state.effect_name + ',';
        }
    }

    return result;
};