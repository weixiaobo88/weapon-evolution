module.exports = Game;

function Game(player_a, player_b) {
    this.player_a = player_a;
    this.player_b = player_b;
}

Game.prototype.start = function() {
    var player_a = this.player_a;
    var player_b = this.player_b;

    var result = {
        loser_name: '',
        attack_process: []
    };

    while(player_a.is_alive() && player_b.is_alive()) {
        if(player_a.is_alive()) {
            result.attack_process.push(player_a.attack(player_b));
        }

        if(player_b.is_alive()) {
            result.attack_process.push(player_b.attack(player_a));
        }
    }

    result.loser_name += player_a.is_alive() ? player_b.name : player_a.name;

    return this.handle_game_msg(result);
};

Game.prototype.handle_game_msg = function(result) {
    var game_msg = {
        lose_msg: '',
        attack_process: ''
    };

    game_msg.lose_msg = inject_lose_msg(result.loser_name);

    game_msg.attack_process = inject_attack_process(result.attack_process);

    return game_msg;
};

function inject_attack_process(attack_process) {
    var result = '';

    attack_process.forEach(function (each_attack) {
        result +=
            each_attack.attacker + '攻击了' + each_attack.attackee + ','
            + each_attack.attackee + '受到了' + each_attack.injured_point + '点伤害,'
            + each_attack.attackee + '剩余生命：' + each_attack.attackee_health_point + '\n';
    });

    return result;
}

function inject_lose_msg(loser_name) {
    return loser_name + '被打败了.';
}



