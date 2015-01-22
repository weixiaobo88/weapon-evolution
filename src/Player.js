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

Player.prototype.trigger_weapon_effect = function() {
    return '';
};

Player.prototype.damaged_by_weapon = function(damaged_point) {
    this.health_point -= damaged_point;
};

Player.prototype.weapon_effect = function() {
    return '';
};

Player.prototype.not_stop_attackee = function() {
    return true;
};

Player.prototype.attack = function(attackee, round) {
    var attacker = this;

    var attackee_injured_point = attacker.get_total_attack_point() - attackee.get_defence_point();
    attackee.health_point -= attackee_injured_point;

    return attacker.get_career() + attacker.get_name()
        + attacker.use_weapon()
        + '攻击了'
        + attackee.get_career() + attackee.get_name() + ','
        + attackee.get_name() + '受到了' + attackee_injured_point + '点伤害,'
        + attacker.trigger_weapon_effect(attackee, round)
        + attackee.get_left_health_point();
};

Player.prototype.get_left_health_point = function() {
    return this.name + '剩余生命：' + this.health_point + '\n';
};
