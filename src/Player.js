module.exports = Player;

function Player(player) {
    this.name = player.name;
    this.health_point = player.health_point;
    this.attack_point = player.attack_point;
    this.defence_point = player.defence_point;
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

Player.prototype.attack = function(attackee) {
    var attacker = this;
    var attackee_injured_point = attacker.get_total_attack_point() - attackee.get_defence_point();
    attackee.health_point -= attackee_injured_point;

    return this.combine_attack_msg(attacker, attackee, attackee_injured_point);
};

Player.prototype.combine_attack_msg = function(attacker, attackee, attackee_injured_point) {
    return attacker.get_career() + attacker.name
        + attacker.use_weapon()
        + '攻击了'
        + attackee.get_career() + attackee.name + ','
        + attackee.name + '受到了' + attackee_injured_point + '点伤害,'
        + attackee.name + '剩余生命：' + attackee.health_point + '\n';
};
