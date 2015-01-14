module.exports = Soldier;

var Player = require('./Player.js');
var Career = require('./Career.js');

function Soldier(soldier) {
    Player.call(this, soldier);
    this.weapon = soldier.weapon;
    this.armor_point = soldier.armor_point;
}

Soldier.prototype = Object.create(Player.prototype);
Soldier.prototype.constructor = Player;
Soldier.prototype.parent = Player.prototype;

Soldier.prototype.attack = function(player_b) {
    var injured_point = this.attack_point + this.weapon.attack_point;

    player_b.health_point -= injured_point;

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
        injured_point: injured_point,
        attackee_health_point: player_b.health_point
    };
};
