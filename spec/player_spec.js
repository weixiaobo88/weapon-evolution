var m = require('jsmockito').JsMockito;
var assert = require('chai').assert;
var Career = require('../src/Career.js');
var Player = require('../src/Player.js');
var Soldier = require('../src/Soldier.js');
var Weapon = require('../src/Weapon.js');
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
        career: Career.NORMAL,
        health_point: 1,
        attack_point: 1,
        defend_point: 0
    };

    var player_b_info = {
        name: '李四',
        career: Career.NORMAL,
        health_point: 1,
        attack_point: 1,
        defend_point: 0
    };

    var player_c_info = {
        name: '李四',
        career: Career.NORMAL,
        health_point: 6,
        attack_point: 4,
        defend_point: 0
    };

    var soldier_a_info = {
        name: '张三',
        career: Career.SOLDIER,
        health_point: 6,
        attack_point: 1,
        defend_point: 1,
        weapon: Weapon.STICK,
        armor_point: 2
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

    describe('game spec with 战士**用优质木棒攻击了普通人**,**受到了*点伤害,**剩余生命：**...**被打败了', function () {
        it('soldier_a PK player_c: 战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                    '普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：5\n' +
                                    '李四被打败了.', function(){
            var soldier_a = new Soldier(soldier_a_info);
            var player_c = new Player(player_c_info);
            var game_msg = new Game(soldier_a, player_c).start();

            var result = game_msg.attack_process + game_msg.lose_msg;

            assert.equal(result, '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                    '普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：5\n' +
                                    '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-4\n' +
                                    '李四被打败了.')
        });

        it('player_c PK soldier_a: 普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：5\n' +
                                    '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                    '普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：4\n' +
                                    '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-4\n' +
                                    '李四被打败了.', function(){
            var soldier_a = new Soldier(soldier_a_info);
            var player_c = new Player(player_c_info);
            var game_msg = new Game(player_c, soldier_a).start();

            var result = game_msg.attack_process + game_msg.lose_msg;

            assert.equal(result, '普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：5\n' +
                                    '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                    '普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：4\n' +
                                    '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-4\n' +
                                    '李四被打败了.');
        });

        it('player_c PK soldier_a: 普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：5\n' +
                                    '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                    '普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：4\n' +
                                    '战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-4\n' +
                                    '李四被打败了.', function(){
            var player_a = new Player(player_a_info);
            var player_c = new Player(player_c_info);
            var game_msg = new Game(player_a, player_c).start();

            var result = game_msg.attack_process + game_msg.lose_msg;

            assert.equal(result, '普通人张三攻击了普通人李四,李四受到了1点伤害,李四剩余生命：5\n' +
                                    '普通人李四攻击了普通人张三,张三受到了4点伤害,张三剩余生命：-3\n' +
                                    '张三被打败了.');
        });
    });

});
