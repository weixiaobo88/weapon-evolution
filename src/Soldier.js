module.exports = Soldier;

var Player = require('./Player.js');

function Soldier(soldier) {
    Player.call(this, soldier);
    this.weapon = soldier.weapon;
    this.armor_point = soldier.armor_point;
}

Soldier.prototype = Object.create(Player.prototype);
Soldier.prototype.constructor = Player;
Soldier.prototype.parent = Player.prototype;

Soldier.prototype.get_total_attack_point = function() {
    return this.attack_point + this.weapon.attack_point;
};

Soldier.prototype.get_defence_point = function() {
    return this.defence_point + this.armor_point;
};

Soldier.prototype.use_weapon = function() {
    return '用' + this.weapon.name;
};