var m = require('jsmockito').JsMockito;
var assert = require('chai').assert;
var Player = require('../src/Player.js');
var Game = require('../src/Game.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("player", function(){
    it("game spec", function(){
        var mocked_console = m.spy(console);
        mocked_console.log("李四被打败了.");
        m.verify(mocked_console).log("李四被打败了.");
    });

    var player_a_info = {
        name: '张三',
        health_point: 1,
        attack_point: 1,
        defend_point: 0
    };

    var player_b_info = {
        name: '李四',
        health_point: 1,
        attack_point: 1,
        defend_point: 0
    };

    var player_c_info = {
        name: '李四',
        health_point: 2,
        attack_point: 1,
        defend_point: 0
    };

    describe('game spec with **被打败了', function() {
        var game;
        var result;
        var player_a;
        var player_b;

        beforeEach(function() {
            player_a = new Player(player_a_info);
            player_b = new Player(player_b_info);
        });

        it('player_a PK player_b: 李四被打败了', function(){
            game = new Game(player_a, player_b);
            result = game.start().lose_msg;

            assert.equal(result, '李四被打败了.');
        });

        it('player_b PK player_a: 张三被打败了', function(){
            game = new Game(player_b, player_a);
            result = game.start().lose_msg;

            assert.equal(result, '张三被打败了.');
        });
    });

    describe('game spec with **攻击了**,**受到了*点伤害,**剩余生命：*...**被打败了', function () {
        it('player_a PK player_b: 张三攻击了李四,李四受到了1点伤害,李四剩余生命：0\n' +
        '李四被打败了.', function(){
            var player_a = new Player(player_a_info);
            var player_b = new Player(player_b_info);
            var game_msg = new Game(player_a, player_b).start();

            var result = game_msg.attack_process + game_msg.lose_msg;

            assert.equal(result, '张三攻击了李四,李四受到了1点伤害,李四剩余生命：0\n李四被打败了.')
        });

        it('player_a PK player_c: 张三攻击了李四,李四受到了1点伤害,李四剩余生命：1\n' +
        '李四攻击了张三,张三受到了1点伤害,张三剩余生命：0\n' +
        '张三被打败了.', function(){
            var player_a = new Player(player_a_info);
            var player_c = new Player(player_c_info);
            var game_msg = new Game(player_a, player_c).start();

            var result = game_msg.attack_process + game_msg.lose_msg;

            assert.equal(result, '张三攻击了李四,李四受到了1点伤害,李四剩余生命：1\n' +
            '李四攻击了张三,张三受到了1点伤害,张三剩余生命：0\n' +
            '张三被打败了.');
        });
    });

});
