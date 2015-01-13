module.exports = Player;

var Career = require('./Career.js');

function Player(player) {
    this.name = player.name;
    this.career = player.career;
    this.health_point = player.health_point;
    this.attack_point = player.attack_point;
    this.defend_point = player.defend_point;
}

Player.prototype.is_alive = function() {
    return this.health_point > 0 ? true : false;
};

Player.prototype.attack = function(player_b) {
    player_b.health_point -= this.attack_point;

    if(player_b.career === Career.SOLDIER) {
        player_b.health_point += player_b.defend_point + player_b.armor_point;
    }

    return {
        attacker: {
            name: this.name,
            career: this.career,
            weapon: this.weapon || ''
        },
        attackee: {
            name: player_b.name,
            career: player_b.career
        },
        injured_point: this.attack_point,
        attackee_health_point: player_b.health_point
    }
};
