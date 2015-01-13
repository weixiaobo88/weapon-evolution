module.exports = Player;

function Player(player) {
    this.name = player.name;
    this.health_point = player.health_point;
    this.attack_point = player.attack_point;
    this.defend_point = player.defend_point;

    this._attack = function (player_b) {
        player_b.health_point--;

        return {
            attacker: this.name,
            attackee: player_b.name,
            injured_point: this.attack_point,
            attackee_health_point: player_b.health_point
        }
    };

    this._is_alive = function () {
        return this.health_point === 0 ? false : true;
    };
}

Player.prototype.fight_with = function(player_b) {
    var result = {
        loser_name: '',
        attack_process: []
    };

    while(this._is_alive() && player_b._is_alive()) {
        if(this._is_alive()) {
            result.attack_process.push(this._attack(player_b));
        }

        if(player_b._is_alive()) {
            result.attack_process.push(player_b._attack(this));
        }
    }

    result.loser_name += this._is_alive() ? player_b.name : this.name;

    return result;
};