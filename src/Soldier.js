module.exports = Soldier;

var Common = require('./Common.js');
var Player = require('./Player.js');

function Soldier(soldier) {
    Player.call(this, soldier);
    this.weapon = soldier.weapon;
    this.armor_point = soldier.armor_point;
}

Soldier.career = '战士';

Common.inherit(Soldier, Player);

Soldier.prototype.get_career = function() {
    return Soldier.career;
};

Soldier.prototype.get_total_attack_point = function() {
    return this.attack_point + this.weapon.attack_point;
};

Soldier.prototype.get_defence_point = function() {
    return this.defence_point + this.armor_point;
};

Soldier.prototype.get_weapon_name = function() {
    return this.weapon.get_name();
};

Soldier.prototype.use_weapon = function() {
    return '用' + this.get_weapon_name();
};

Soldier.prototype.not_stop_attackee = function(round) {
    return this.weapon.effect_not_stop_attackee(round);
};

Soldier.prototype.get_weapon = function() {
    return this.weapon;
};

Soldier.prototype.get_weapon_effect = function() {
    return this.weapon.get_effect();
};

Soldier.prototype.trigger_weapon_effect = function (attackee) {
    //attackee.update_debuff(this.get_weapon());

    var result = '';

    if(this.weapon.effect_is_triggered()) {
        attackee.update_debuff(this.get_weapon().get_effect(), this);
        //console.log(this.get_weapon().get_effect());
        //result += attackee.get_name() + this.weapon.get_effect_name() + '了,';
    }

    //if(attackee.get_debuff()) {
    //
    //}

    //return result;
};

Soldier.prototype.weapon_effect = function(attackee, round) {
    return this.weapon.effect_msg(attackee, this, round);
};


