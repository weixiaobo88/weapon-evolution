var m = require('jsmockito').JsMockito;
var assert = require('chai').assert;
var Player = require('../src/Player.js');
var Soldier = require('../src/Soldier.js');
var Weapon = require('../src/Weapon.js');
var Poisonous_Weapon = require('../src/Poisonous_Weapon.js');
var Flame_Weapon = require('../src/Flame_Weapon.js');
var Frost_Weapon = require('../src/Frost_Weapon.js');
var Vertigo_Weapon = require('../src/Vertigo_Weapon.js');
var Game = require('../src/Game.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("player", function(){
    var STICK = {
        name: '优质木棒',
        attack_point: 4
    };

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

    var player_d_info = {
        name: '李四',
        health_point: 12,
        attack_point: 4,
        defence_point: 0
    };

    var player_e_info = {
        name: '李四',
        health_point: 16,
        attack_point: 4,
        defence_point: 0
    };

    var soldier_a_info = {
        name: '张三',
        health_point: 6,
        attack_point: 1,
        defence_point: 1,
        weapon: new Weapon(STICK),
        armor_point: 2
    };

    var soldier_b_info = {
        name: '李四',
        health_point: 8,
        attack_point: 2,
        defence_point: 2,
        weapon: new Weapon(STICK),
        armor_point: 2
    };

    var poisonous_sword = new Poisonous_Weapon(POISONOUS_SWORD);
    var flame_sword = new Flame_Weapon(FLAME_SWORD);
    var frost_sword = new Frost_Weapon(FROST_SWORD);
    var vertigo_hammer = new Vertigo_Weapon(VERTIGO_HAMMER);

    var soldier_c_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: poisonous_sword,
        armor_point: 2
    };
    var soldier_d_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: flame_sword,
        armor_point: 2
    };

    var soldier_e_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: frost_sword,
        armor_point: 2
    };
    var soldier_f_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: vertigo_hammer,
        armor_point: 2
    };

    describe('players fight with stub is_alive', function() {
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

    describe('players fight with weapon features: ', function () {
        it('soldier_a with poisonous_sword fight with player_d one round: ', function () {
            var soldier_c = new Soldier(soldier_c_info);
            var player_d = new Player(player_d_info);

            spyOn(poisonous_sword, 'effect_is_triggered').andReturn(true);

            var attack_process = soldier_c.attack(player_d);
            attack_process += player_d.attack(soldier_c);

            assert.equal(attack_process, '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：7\n' +
                                            '李四受到2点毒性伤害,李四剩余生命：5\n' +
                                            '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n');
        });

        it('soldier_a with flame_sword fight with player_d one round: ', function () {
            var soldier_d = new Soldier(soldier_d_info);
            var player_d = new Player(player_d_info);

            spyOn(flame_sword, 'effect_is_triggered').andReturn(true);

            var attack_process = soldier_d.attack(player_d);
            attack_process += player_d.attack(soldier_d);

            assert.equal(attack_process, '战士张三用火焰剑攻击了普通人李四,李四受到了5点伤害,李四着火了,李四剩余生命：7\n' +
                                            '李四受到2点火焰伤害,李四剩余生命：5\n' +
                                            '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n');
        });

        it('soldier_a with frost_sword fight with player_d: ', function () {
            var soldier_e = new Soldier(soldier_e_info);
            var player_e = new Player(player_e_info);

            spyOn(frost_sword, 'effect_is_triggered').andReturn(true);

            var attack_process = soldier_e.attack(player_e);
            attack_process += player_e.attack(soldier_e);
            attack_process += soldier_e.attack(player_e);
            attack_process += player_e.attack(soldier_e);
            attack_process += soldier_e.attack(player_e);
            attack_process += player_e.attack(soldier_e);

            assert.equal(attack_process, '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四冻僵了,李四剩余生命：11\n' +
                                            '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n' +
                                            '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四冻僵了,李四剩余生命：6\n' +
                                            '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：4\n' +
                                            '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四冻僵了,李四剩余生命：1\n' +
                                            '李四冻得直哆嗦,没有击中张三\n');
        });

        it('soldier with vertigo_hammer fight with player: ', function () {
            var soldier_f = new Soldier(soldier_f_info);
            var player_e = new Player(player_e_info);

            spyOn(vertigo_hammer, 'effect_is_triggered').andReturn(true);

            var attack_process = soldier_f.attack(player_e);
            attack_process += player_e.attack(soldier_f);
            attack_process += soldier_f.attack(player_e);
            attack_process += player_e.attack(soldier_f);
            attack_process += soldier_f.attack(player_e);
            attack_process += player_e.attack(soldier_f);

            assert.equal(attack_process, '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四晕倒了,李四剩余生命：11\n' +
                                            '李四晕倒了,无法攻击,眩晕还剩：1轮\n' +
                                            '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四晕倒了,李四剩余生命：6\n' +
                                            '李四晕倒了,无法攻击,眩晕还剩：0轮\n' +
                                            '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四晕倒了,李四剩余生命：1\n' +
                                            '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n');
        });
    });

    xdescribe('weapon effect: ', function () {
        describe('poisonous_sword: ', function () {
            it('soldier_a with poisonous_sword attack player_d at first round: ', function () {
                var soldier_c = new Soldier(soldier_c_info);
                var player_d = new Player(player_d_info);
                var round = 1;

                var attack_process = soldier_c.attack(player_d, round);

                assert.equal(attack_process, '战士张三用优质毒剑攻击了普通人李四,李四受到了5点伤害,李四中毒了,李四剩余生命：7\n');
            });

            it('soldier_a with poisonous_sword attack player_d at third round: ', function () {
                var soldier_c = new Soldier(soldier_c_info);
                var player_d = new Player(player_d_info);
                var third_round = 3;

                var weapon_effect = soldier_c.weapon_effect(player_d, third_round);

                assert.equal(weapon_effect, '');
            });
        });

        xdescribe('frost_sword: ', function () {
            it('soldier_e with frost_sword attack player_d at first round: ', function(){
                var soldier_e = new Soldier(soldier_e_info);
                var player_d = new Player(player_d_info);
                var first_round = 1;

                var weapon_effect = soldier_e.weapon_effect(player_d, first_round);
                assert.equal(weapon_effect, '');
            });

            it('soldier_e with frost_sword attack player_d at third round: ', function(){
                var soldier_e = new Soldier(soldier_e_info);
                var player_d = new Player(player_d_info);
                var third_round = 3;

                var weapon_effect = soldier_e.weapon_effect(player_d, third_round);
                assert.equal(weapon_effect, '李四冻得直哆嗦,没有击中张三\n');
            });

            it('soldier_e with frost_sword attack player_d at sixth round: ', function(){
                var soldier_e = new Soldier(soldier_e_info);
                var player_d = new Player(player_d_info);
                var sixth_round = 6;

                var weapon_effect = soldier_e.weapon_effect(player_d, sixth_round);
                assert.equal(weapon_effect, '李四冻得直哆嗦,没有击中张三\n');
            });
        });

        xdescribe('vertigo_hammer: ', function () {
            it('soldier_f with vertigo_hammer attack player_d at first round: ', function(){
                var soldier_f = new Soldier(soldier_f_info);
                var player_d = new Player(player_d_info);
                var first_round = 1;

                var weapon_effect = soldier_f.weapon_effect(player_d, first_round);
                assert.equal(weapon_effect, '李四晕倒了,无法攻击,眩晕还剩：1轮\n');
            });

            it('soldier_f with vertigo_hammer attack player_d at second round: ', function(){
                var soldier_f = new Soldier(soldier_f_info);
                var player_d = new Player(player_d_info);
                var second_round = 2;

                var weapon_effect = soldier_f.weapon_effect(player_d, second_round);
                assert.equal(weapon_effect, '李四晕倒了,无法攻击,眩晕还剩：0轮\n');
            });

            it('soldier_f with vertigo_hammer attack player_d at third round: ', function(){
                var soldier_f = new Soldier(soldier_f_info);
                var player_d = new Player(player_d_info);
                var second_round = 3;

                var weapon_effect = soldier_f.weapon_effect(player_d, second_round);
                assert.equal(weapon_effect, '');
            });
        });

    });

});
