module.exports = Player;

var Common = require('./Common.js');

function Player(player) {
    this.name = player.name;
    this.health_point = player.health_point;
    this.attack_point = player.attack_point;
    this.defence_point = player.defence_point;
    this.debuff = {};
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

Player.prototype.trigger_weapon_effect = function() {
    return '';
};

Player.prototype.damaged_by_weapon = function(damaged_point) {
    this.health_point -= damaged_point;
};

Player.prototype.weapon_effect = function() {
    return '';
};

Player.prototype.get_weapon_name = function() {
    return '';
};

Player.prototype.not_stop_attackee = function() {
    return true;
};


Player.prototype.get_debuff = function() {
    return this.debuff;
};

Player.prototype.update_debuff = function(weapon_effect) {
    if(!this.has_debuff()) {
        this.debuff = Common.clone(weapon_effect);
    }

    if(!Common.has_same_value(this.debuff, weapon_effect)) {
        this.debuff.effect_damage_point += weapon_effect.effect_damage_point;
        this.debuff.delay_round += weapon_effect.delay_round;
    }

    return this.debuff;
};

Player.prototype.get_weapon_effect = function() {
    return '';
};

Player.prototype.damaged_by_weapon_effect = function() {
    this.health_point -= this.debuff.effect_damage_point;

    return this.get_name() + '受到'
        + this.debuff.effect_damage_point + '点'
        + this.debuff.effect_damage_name + '伤害,'
        + this.get_left_health_point();
};

Player.prototype.has_debuff = function() {
    return !Common.is_empty(this.debuff);
};

Player.prototype.attack = function(attackee, round) {
    var attacker = this;

    var result = '';
    var injured_by_weapon_effect_msg = '';

    //如果attacker有武器，attackee记录debuff
    //如果attacker有debuff，attacker打印debuff
    //问题：debuff该以什么数据结构存储

    var attacker_weapon_effect = attacker.get_weapon_effect();

    if(attacker_weapon_effect) {
        attackee.debuff = attackee.update_debuff(attacker_weapon_effect);
    }

    if(attackee.has_debuff()) {
        if(attackee.debuff.delay_round-- > 0) {
            injured_by_weapon_effect_msg = attackee.get_name() + attackee.debuff.effect_name + ',';
        }
    }

    if(attacker.has_debuff()) {
        if(attacker.debuff.effect_name === '中毒了' || attacker.debuff.effect_name === '着火了' ) {
            if(attacker.debuff.delay_round >= 0) {
                result += attacker.damaged_by_weapon_effect();//李四受到2点毒性伤害,李四剩余生命：15
            }
            if(attacker.debuff.delay_round < 0) {
                attacker.debuff = {};
            }
            result += ''
        }
        else if(attacker.debuff.effect_name === '冻僵了') {
            if(--attacker.debuff.effect_damage_round === 0) {
                return attacker.get_name() + attacker.debuff.effect_damage_name + ',没有击中' + attackee.get_name() + '\n';
            }
            if(attacker.debuff.delay_round < 0) {
                attacker.debuff = {};
            }
            result += '';
        }
        else if(attacker.debuff.effect_name === '晕倒了') {
            if(--attacker.debuff.effect_damage_round >= 0) {
                return attacker.get_name() + attacker.debuff.effect_damage_name + '还剩：' + attacker.debuff.effect_damage_round + '轮\n';
            }
            if(attacker.debuff.delay_round < 0) {
                attacker.debuff = {};
            }
            result += '';
        }
        else {
            result += attacker.damaged_by_weapon_effect();
        }

    }

    if(attacker.get_weapon_name() === '利剑' && attacker.trigger_weapon_effect()) {
        var injured_point = attacker.get_weapon_effect().effect_damage_point * 3;
        attackee.health_point -= injured_point;

        return attacker.get_career() + attacker.get_name()
            + attacker.use_weapon()
            + '攻击了'
            + attackee.get_career() + attackee.get_name() + ','
            + attacker.get_name() + '发动了' + attacker.get_weapon_effect().effect_name + ','
            + attackee.get_name() + '受到了' + injured_point + '点伤害,'
            + attackee.get_left_health_point();
    }

    var attackee_injured_point = attacker.get_total_attack_point() - attackee.get_defence_point();
    attackee.health_point -= attackee_injured_point;

    result += attacker.get_career() + attacker.get_name()
        + attacker.use_weapon()
        + '攻击了'
        + attackee.get_career() + attackee.get_name() + ','
        + attackee.get_name() + '受到了' + attackee_injured_point + '点伤害,'
        + injured_by_weapon_effect_msg
        + attackee.get_left_health_point();

    return result;
};

Player.prototype.get_left_health_point = function() {
    return this.name + '剩余生命：' + this.health_point + '\n';
};
