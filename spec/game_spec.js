var m = require('jsmockito').JsMockito;
var assert = require('chai').assert;
var Player = require('../src/Player.js');
var Soldier = require('../src/Soldier.js');
var Game = require('../src/Game.js');
var Poisonous_Weapon = require('../src/Poisonous_Weapon.js');
var Flame_Weapon = require('../src/Flame_Weapon.js');
var Frost_Weapon = require('../src/Frost_Weapon.js');
var Vertigo_Weapon = require('../src/Vertigo_Weapon.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("game", function(){
    it("game spec", function(){
        var mocked_console = m.spy(console);
        mocked_console.log("李四被打败了.");
        m.verify(mocked_console).log("李四被打败了.");
    });

    var POISONOUS_SWORD = {
        name: '优质毒剑',
        attack_point: 2
    };

    var FLAME_SWORD = {
        name: '火焰剑',
        attack_point: 2
    };

    var FROST_SWORD = {
        name: '寒冰剑',
        attack_point: 2
    };

    var VERTIGO_HAMMER = {
        name: '晕锤',
        attack_point: 2
    };

    var player_a_info = {
        name: '张三',
        health_point: 4,
        attack_point: 1,
        defence_point: 0
    };

    var player_b_info = {
        name: '李四',
        health_point: 4,
        attack_point: 1,
        defence_point: 0
    };

    var player_c_info = {
        name: '李四',
        health_point: 22,
        attack_point: 4,
        defence_point: 0
    };

    var soldier_a_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: new Poisonous_Weapon(POISONOUS_SWORD),
        armor_point: 2
    };

    var soldier_b_info = {
        name: '李四',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: new Flame_Weapon(FLAME_SWORD),
        armor_point: 2
    };

    var soldier_c_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: new Frost_Weapon(FROST_SWORD),
        armor_point: 2
    };

    var soldier_d_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: new Vertigo_Weapon(VERTIGO_HAMMER),
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
            result = game.start();

            assert.match(result, /李四被打败了.\n$/);
        });

        it('player_b PK player_a: 张三被打败了', function(){
            game = new Game(player_b, player_a);
            result = game.start();

            assert.match(result, /张三被打败了.\n$/);
        });
    });

    describe('game spec with stub: ', function() {
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

    describe('game spec with weapon effect ', function() {
        it('soldier_a with poisonous_weapon PK player_c: ', function () {
            var soldier_a = new Soldier(soldier_a_info);
            var player_c = new Player(player_c_info);

            var count_a = 0;
            spyOn(soldier_a, 'is_alive').andCallFake(function() {
                count_a++;
                return count_a < 3;
            });

            var count_b = 0;
            spyOn(player_c, 'is_alive').andCallFake(function() {
                count_b++;
                return count_b < 5;
            });

            spyOn(soldier_a, 'attack').andReturn('//张三攻击\n');
            spyOn(player_c, 'attack').andReturn('//李四攻击\n');
            spyOn(soldier_a, 'weapon_effect').andReturn('//李四受到*点毒性伤害,李四剩余生命：\n');

            var game_msg = new Game(soldier_a, player_c).start();

            assert.equal(game_msg, '//张三攻击\n'
                                    + '//李四受到*点毒性伤害,李四剩余生命：\n'
                                    + '//李四攻击\n'
                                    + '//张三攻击\n'
                                    + '//李四受到*点毒性伤害,李四剩余生命：\n'
                                    + '//李四攻击\n'
                                    + '张三被打败了.\n');
        });

        it('soldier_a with poisonous_weapon PK soldier_b with flame weapon: ', function () {
            var soldier_a = new Soldier(soldier_a_info);
            var soldier_b = new Soldier(soldier_b_info);

            var count_a = 0;
            spyOn(soldier_a, 'is_alive').andCallFake(function() {
               count_a++;
               return count_a != 3;
            });

            var count_b = 0;
            spyOn(soldier_b, 'is_alive').andCallFake(function() {
               count_b++;
               return count_b != 4;
            });

            spyOn(soldier_a, 'attack').andReturn('//张三攻击\n');
            spyOn(soldier_b, 'attack').andReturn('//李四攻击\n');
            spyOn(soldier_a, 'weapon_effect').andReturn('//李四受到*点毒性伤害,李四剩余生命：\n');
            spyOn(soldier_b, 'weapon_effect').andReturn('//张三受到*点火焰伤害,张三剩余生命：\n');

            var game_msg = new Game(soldier_a, soldier_b).start();

            assert.equal(game_msg, '//张三攻击\n'
                                    + '//李四受到*点毒性伤害,李四剩余生命：\n'
                                    + '//李四攻击\n'
                                    + '//张三受到*点火焰伤害,张三剩余生命：\n'
                                    + '//张三攻击\n'
                                    + '李四被打败了.\n');
        });

        it('soldier_c with frost_weapon PK player_c', function () {
            var soldier_c = new Soldier(soldier_c_info);
            var player_c = new Player(player_c_info);

            var count_a = 0;
            spyOn(soldier_c, 'is_alive').andCallFake(function() {
                count_a++;
                return count_a != 5;
            });

            var count_b = 0;
            spyOn(player_c, 'is_alive').andCallFake(function() {
                count_b++;
                return count_b != 8;
            });

            spyOn(soldier_c, 'attack').andReturn('//张三攻击\n');
            spyOn(player_c, 'attack').andReturn('//李四攻击\n');
            spyOn(soldier_c, 'weapon_effect').andCallThrough();

            var game_msg = new Game(soldier_c, player_c).start();

            assert.equal(game_msg, '//张三攻击\n'
                                    + '//李四攻击\n'
                                    + '//张三攻击\n'
                                    + '//李四攻击\n'
                                    + '//张三攻击\n'
                                    + '李四冻得直哆嗦,没有击中张三\n'
                                    + '//张三攻击\n'
                                    + '李四被打败了.\n');
        });

        it('soldier_d with vertigo_weapon PK player_c', function(){
            var soldier_d = new Soldier(soldier_d_info);
            var player_c = new Player(player_c_info);

            var count_a = 0;
            spyOn(soldier_d, 'is_alive').andCallFake(function() {
                count_a++;
                return count_a != 5;
            });

            var count_b = 0;
            spyOn(player_c, 'is_alive').andCallFake(function() {
                count_b++;
                return count_b != 8;
            });

            spyOn(soldier_d, 'attack').andReturn('//张三攻击\n');
            spyOn(soldier_d, 'weapon_effect').andCallThrough();

            var count_c = 0;
            spyOn(player_c, 'attack').andCallFake(function () {
                if(count_c++ > 2) {
                   return '//李四攻击\n';
                }
                else {
                    return player_c.attack(soldier_d);
                }
            });

            var game_msg = new Game(soldier_d, player_c).start();

            assert.equal(game_msg, '//张三攻击\n'
                                    + '李四晕倒了,无法攻击,眩晕还剩：1轮\n'
                                    + '//张三攻击\n'
                                    + '李四晕倒了,无法攻击,眩晕还剩：0轮\n'
                                    + '//张三攻击\n'
                                    + '//李四攻击\n'
                                    + '//张三攻击\n'
                                    + '李四被打败了.\n');
        });

    });

});
