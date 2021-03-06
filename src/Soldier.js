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

Soldier.prototype.get_weapon_effect = function() {
    return this.weapon.get_effect();
};