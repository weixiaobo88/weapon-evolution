var m = require('jsmockito').JsMockito;
var assert = require('chai').assert;
var Player = require('../src/Player.js');
var Soldier = require('../src/Soldier.js');
var Weapon = require('../src/Weapon.js');
var Game = require('../src/Game.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("player", function(){
    var player_a_info = {
        name: '张三',
        health_point: 1,
        attack_point: 1,
        defence_point: 0
    };

    var player_b_info = {
        name: '李四',
        health_point: 1,
        attack_point: 1,
        defence_point: 0
    };

    var player_c_info = {
        name: '李四',
        health_point: 6,
        attack_point: 4,
        defence_point: 0
    };

    var soldier_a_info = {
        name: '张三',
        health_point: 6,
        attack_point: 1,
        defence_point: 1,
        weapon: Weapon.STICK,
        armor_point: 2
    };

    var soldier_b_info = {
        name: '李四',
        health_point: 8,
        attack_point: 2,
        defence_point: 2,
        weapon: Weapon.STICK,
        armor_point: 2
    };

    describe('player spec with stub is_alive', function() {
        it('player_a attack player_b once: ', function () {
            var player_a = new Player(player_a_info);
            var player_b = new Player(player_b_info);

            var attack_process = player_a.attack(player_b);

            assert.equal(attack_process, '普通人张三攻击了普通人李四,李四受到了1点伤害,李四剩余生命：0\n');
        });

        it('soldier_a attack player_c once: ', function () {
            var soldier_a = new Soldier(soldier_a_info);
            var player_c = new Player(player_c_info);

            var attack_process = soldier_a.attack(player_c);

            assert.equal(attack_process, '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n');
        });

        it('player_c attack soldier_a once: ', function () {
            var player_c = new Player(player_c_info);
            var soldier_a = new Soldier(soldier_a_info);

            var attack_process = player_c.attack(soldier_a);

            assert.equal(attack_process, '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n');
        });

        it('soldier_a attack soldier_b once: ', function () {
            var soldier_a = new Soldier(soldier_a_info);
            var soldier_b = new Soldier(soldier_b_info);

            var attack_process = soldier_a.attack(soldier_b);

            assert.equal(attack_process, '战士张三用优质木棒攻击了战士李四,李四受到了1点伤害,李四剩余生命：7\n');
        });
    });
});
