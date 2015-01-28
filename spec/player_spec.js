var m = require('jsmockito').JsMockito;
var assert = require('chai').assert;
var Player = require('../src/Player.js');
var Soldier = require('../src/Soldier.js');
var Weapon = require('../src/Weapon.js');
var Poisonous_Effect = require('../src/Poisonous_Effect.js');
var Flame_Effect = require('../src/Flame_Effect.js');
var Frost_Effect = require('../src/Frost_Effect.js');
var Vertigo_Weapon = require('../src/Vertigo_Weapon.js');
var Full_Attack_Weapon = require('../src/Full_Attack_Weapon.js');
var Game = require('../src/Game.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("player", function(){
    var STICK = {
        name: '优质木棒',
        attack_point: 4
    };

    var POISONOUS_SWORD = {
        name: '优质毒剑',
        attack_point: 2,
        effect: new Poisonous_Effect()
    };

    var FLAME_SWORD = {
        name: '火焰剑',
        attack_point: 2,
        effect: new Flame_Effect()
    };

    var FROST_SWORD = {
        name: '寒冰剑',
        attack_point: 2,
        effect: new Frost_Effect()
    };

    var VERTIGO_HAMMER = {
        name: '晕锤',
        attack_point: 2
    };

    var SHARP_SWORD = {
        name: '利剑',
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

    var player_f_info = {
        name: '李四',
        health_point: 20,
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

    var poisonous_sword = new Weapon(POISONOUS_SWORD);
    var flame_sword = new Weapon(FLAME_SWORD);
    var frost_sword = new Weapon(FROST_SWORD);
    var vertigo_hammer = new Vertigo_Weapon(VERTIGO_HAMMER);
    var sharp_sword = new Full_Attack_Weapon(SHARP_SWORD);

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

    var soldier_g_info = {
        name: '张三',
        health_point: 6,
        attack_point: 3,
        defence_point: 1,
        weapon: sharp_sword,
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

            var count_a = 0;
            spyOn(frost_sword, 'effect_is_triggered').andCallFake(function() {
                    count_a++;
                    return count_a < 2;
                }
            );

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
                                            '战士张三用寒冰剑攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                            '李四冻得直哆嗦,没有击中张三\n');
        });

        it('soldier with vertigo_hammer fight with player: ', function () {
            var soldier_f = new Soldier(soldier_f_info);
            var player_e = new Player(player_e_info);

            var count_a = 0;
            spyOn(vertigo_hammer, 'effect_is_triggered').andCallFake(function() {
                    count_a++;
                    return count_a < 2;
                }
            );

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
                                            '战士张三用晕锤攻击了普通人李四,李四受到了5点伤害,李四剩余生命：1\n' +
                                            '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n');
        });

        it('soldier with sharp_sword fight with player: ', function () {
            var soldier_g = new Soldier(soldier_g_info);
            var player_e = new Player(player_f_info);

            spyOn(sharp_sword, 'effect_is_triggered').andReturn(true);

            var attack_process = soldier_g.attack(player_e);
            attack_process += player_e.attack(soldier_g);
            attack_process += soldier_g.attack(player_e);

            assert.equal(attack_process, '战士张三用利剑攻击了普通人李四,张三发动了全力一击,李四受到了15点伤害,李四剩余生命：5\n' +
                                            '普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：5\n' +
                                            '战士张三用利剑攻击了普通人李四,张三发动了全力一击,李四受到了15点伤害,李四剩余生命：-10\n');
        });
    });

});
