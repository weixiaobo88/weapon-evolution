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

describe("game with weapon effect: ", function(){
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

    var player_c_info = {
        name: '李四',
        health_point: 22,
        attack_point: 4,
        defence_point: 0
    };

    var player_d_info = {
        name: '李四',
        health_point: 40,
        attack_point: 4,
        defence_point: 0
    };

    var poisonous_sword = new Poisonous_Weapon(POISONOUS_SWORD);
    var flame_sword = new Flame_Weapon(FLAME_SWORD);

    var soldier_a_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: poisonous_sword,
        armor_point: 2
    };

    var soldier_e_info = {
        name: '张三',
        health_point: 16,
        attack_point: 3,
        defence_point: 1,
        weapon: poisonous_sword,
        armor_point: 2
    };

    var soldier_b_info = {
        name: '李四',
        health_point: 16,
        attack_point: 3,
        defence_point: 1,
        weapon: flame_sword,
        armor_point: 2
    };

    var frost_sword = new Frost_Weapon(FROST_SWORD);
    var soldier_c_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: frost_sword,
        armor_point: 2
    };

    var vertigo_hammer = new Vertigo_Weapon(VERTIGO_HAMMER);
    var soldier_d_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: vertigo_hammer,
        armor_point: 2
    };

    describe('current test', function () {

    });
    describe('game spec with weapon effect ', function() {
        it('soldier with poisonous_weapon PK player: ', function () {
            var soldier_a = new Soldier(soldier_a_info);
            var player_c = new Player(player_c_info);

            var count_a = 0;
            spyOn(soldier_a, 'is_alive').andCallFake(function () {
                count_a++;
                return count_a < 3;
            });

            var count_b = 0;
            spyOn(player_c, 'is_alive').andCallFake(function () {
                count_b++;
                return count_b < 5;
            });

            spyOn(soldier_a, 'attack').andReturn('//张三攻击\n');
            spyOn(player_c, 'attack').andReturn('//李四攻击\n');

            var game_msg = new Game(soldier_a, player_c).start();

            assert.equal(game_msg, '//张三攻击\n'
                                    + '//李四攻击\n'
                                    + '//张三攻击\n'
                                    + '//李四攻击\n'
                                    + '张三被打败了.\n');
        });

        it('soldier with poisonous_weapon effect triggered once PK player: ', function () {
            var soldier_a = new Soldier(soldier_a_info);
            var player_c = new Player(player_c_info);

            var count_c = 0;
            spyOn(poisonous_sword, 'effect_is_triggered').andCallFake(function() {
                count_c++;
                return count_c < 2;
            });

            var game_msg = new Game(soldier_a, player_c).start();

            assert.equal(game_msg, '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：17\n' +
                                    '李四受到2点毒性伤害,李四剩余生命：15\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：10\n' +
                                    '李四受到2点毒性伤害,李四剩余生命：8\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：4\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：3\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：3\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-2\n' +
                                    '李四被打败了.\n');
        });

        it('soldier with poisonous_weapon effect triggered twice PK player: ', function () {
            var soldier_a = new Soldier(soldier_a_info);
            var player_c = new Player(player_d_info);

            var count_c = 0;
            spyOn(poisonous_sword, 'effect_is_triggered').andCallFake(function() {
                count_c++;
                return count_c < 3;
            });

            var game_msg = new Game(soldier_a, player_c).start();

            assert.equal(game_msg, '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：35\n' +
                                    '李四受到2点毒性伤害,李四剩余生命：33\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：28\n' +
                                    '李四受到4点毒性伤害,李四剩余生命：24\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：4\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：19\n' +
                                    '李四受到4点毒性伤害,李四剩余生命：15\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：3\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：10\n' +
                                    '李四受到4点毒性伤害,李四剩余生命：6\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：2\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：1\n' +
                                    '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-4\n' +
                                    '李四被打败了.\n');
        });

        it('soldier with poisonous_weapon PK soldier_b with flame weapon: ', function () {
            var soldier_a = new Soldier(soldier_e_info);
            var soldier_b = new Soldier(soldier_b_info);

            var count_a = 0;
            spyOn(poisonous_sword, 'effect_is_triggered').andCallFake(function() {
                count_a++;
                return count_a < 2;
            });

            var count_b = 0;
            spyOn(flame_sword, 'effect_is_triggered').andCallFake(function() {
                count_b++;
                return count_b < 2;
            });

            var game_msg = new Game(soldier_a, soldier_b).start();

            assert.equal(game_msg, '战士张三用优质毒剑攻击了战士李四,李四受到了2点伤害,李四中毒了,李四剩余生命：14\n' +
                                    '李四受到2点毒性伤害,李四剩余生命：12\n' +
                                    '战士李四用火焰剑攻击了战士张三,张三受到了2点伤害,张三着火了,张三剩余生命：14\n' +
                                    '张三受到2点火焰伤害,张三剩余生命：12\n' +
                                    '战士张三用优质毒剑攻击了战士李四,李四受到了2点伤害,李四中毒了,李四剩余生命：10\n' +
                                    '李四受到2点毒性伤害,李四剩余生命：8\n' +
                                    '战士李四用火焰剑攻击了战士张三,张三受到了2点伤害,张三着火了,张三剩余生命：10\n' +
                                    '张三受到2点火焰伤害,张三剩余生命：8\n' +
                                    '战士张三用优质毒剑攻击了战士李四,李四受到了2点伤害,李四剩余生命：6\n' +
                                    '战士李四用火焰剑攻击了战士张三,张三受到了2点伤害,张三剩余生命：6\n' +
                                    '战士张三用优质毒剑攻击了战士李四,李四受到了2点伤害,李四剩余生命：4\n' +
                                    '战士李四用火焰剑攻击了战士张三,张三受到了2点伤害,张三剩余生命：4\n' +
                                    '战士张三用优质毒剑攻击了战士李四,李四受到了2点伤害,李四剩余生命：2\n' +
                                    '战士李四用火焰剑攻击了战士张三,张三受到了2点伤害,张三剩余生命：2\n' +
                                    '战士张三用优质毒剑攻击了战士李四,李四受到了2点伤害,李四剩余生命：0\n' +
                                    '李四被打败了.\n');
        });

        it('soldier_c with frost_sword PK player_c', function () {
            var soldier_c = new Soldier(soldier_c_info);
            var player_c = new Player(player_c_info);

            var count_a = 0;
            spyOn(frost_sword, 'effect_is_triggered').andCallFake(function() {
                count_a++;
                return count_a < 2;
            });

            var game_msg = new Game(soldier_c, player_c).start();

            assert.equal(game_msg, '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四冻僵了,李四剩余生命：17\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n' +
                                    '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四冻僵了,李四剩余生命：12\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：4\n' +
                                    '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：7\n' +
                                    '李四冻得直哆嗦,没有击中张三\n' +
                                    '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：2\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：3\n' +
                                    '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-3\n' +
                                    '李四被打败了.\n');
        });

        it('soldier_d with vertigo_hammer PK player_c', function () {
            var soldier_d = new Soldier(soldier_d_info);
            var player_c = new Player(player_c_info);

            var count_a = 0;
            spyOn(vertigo_hammer, 'effect_is_triggered').andCallFake(function() {
                count_a++;
                return count_a < 2;
            });

            var game_msg = new Game(soldier_d, player_c).start();

            assert.equal(game_msg, '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四晕倒了,李四剩余生命：17\n' +
                                    '李四晕倒了,无法攻击,眩晕还剩：1轮\n' +
                                    '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四晕倒了,李四剩余生命：12\n' +
                                    '李四晕倒了,无法攻击,眩晕还剩：0轮\n' +
                                    '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四剩余生命：7\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n' +
                                    '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四剩余生命：2\n' +
                                    '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：4\n' +
                                    '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四剩余生命：-3\n' +
                                    '李四被打败了.\n');
        });
    });
});
