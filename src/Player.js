module.exports = Player;

function Player(player) {
    this.name = player.name;
    this.health_point = player.health_point;
    this.attack_point = player.attack_point;
    this.defend_point = player.defend_point;
}

Player.prototype.is_alive = function() {
    return this.health_point === 0 ? false : true;
};

Player.prototype.attack = function(player_b) {
    player_b.health_point--;

    return {
        attacker: this.name,
        attackee: player_b.name,
        injured_point: this.attack_point,
        attackee_health_point: player_b.health_point
    }
};