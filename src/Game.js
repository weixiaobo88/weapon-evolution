module.exports = Game;

function Game(player_a, player_b) {
    this.player_a = player_a;
    this.player_b = player_b;
}

Game.prototype.start = function() {
    var attacker = this.player_a;
    var attackee = this.player_b;

    var fight_process = '';

    while (attacker.is_alive() && attackee.is_alive()) {
        fight_process += attacker.attack(attackee);

        if (attackee.is_alive()) {
            fight_process += attackee.attack(attacker);
        }
    }

    var fight_result = this.get_fight_result();

    return fight_process + fight_result;
};

Game.prototype.get_fight_result = function() {
    var loser_name = this.player_a.is_alive() ? this.player_b.get_name() : this.player_a.get_name();

    return loser_name + '被打败了.\n';
};

