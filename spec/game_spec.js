var m = require('jsmockito').JsMockito;
var assert = require('chai').assert;
var Career = require('../src/Career.js');
var Player = require('../src/Player.js');
var Soldier = require('../src/Soldier.js');
var Weapon = require('../src/Weapon.js');
var Game = require('../src/Game.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("game", function(){
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
        defence_point: 0
    };

    var player_b_info = {
        name: '李四',
        career: Career.NORMAL,
        health_point: 1,
        attack_point: 1,
        defence_point: 0
    };

    var player_c_info = {
        name: '李四',
        career: Career.NORMAL,
        health_point: 6,
        attack_point: 4,
        defence_point: 0
    };

    var soldier_a_info = {
        name: '张三',
        career: Career.SOLDIER,
        health_point: 6,
        attack_point: 1,
        defence_point: 1,
        weapon: Weapon.STICK,
        armor_point: 2
    };
    //
    //var soldier_b_info = {
    //    name: '李四',
    //    career: Career.SOLDIER,
    //    health_point: 6,
    //    attack_point: 1,
    //    defence_point: 1,
    //    weapon: Weapon.STICK,
    //    armor_point: 2
    //};

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
            result = game.start();

            assert.match(result, /李四被打败了.\n$/);
        });

        it('player_b PK player_a: 张三被打败了', function(){
            game = new Game(player_b, player_a);
            result = game.start();

            assert.match(result, /张三被打败了.\n$/);
        });
    });

    describe('game spec with ', function() {
        it('player_a PK player_b: stub is_alive and attack, player_a_is_alive true:false, ' +
                                'player_b_is_alive true:true:false', function () {
            var player_a = new Player(player_a_info);
            var player_b = new Player(player_b_info);

            var count_a = 0;
            spyOn(player_a, 'is_alive').andCallFake(function() {
                count_a++;
                return count_a != 2;
            });

            var count_b = 0;
            spyOn(player_b, 'is_alive').andCallFake(function() {
                count_b++;
                return count_b != 3;
            });

            spyOn(player_a, 'attack').andReturn('//张三攻击\n');
            spyOn(player_b, 'attack').andReturn('//李四攻击\n');

            var game_msg = new Game(player_a, player_b).start();

            assert.equal(game_msg, '//张三攻击\n'
                                    + "//李四攻击\n"
                                    + "李四被打败了.\n");
        });
    });

});
