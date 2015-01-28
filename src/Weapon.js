module.exports = Weapon;
var Common = require('./Common.js');

function Weapon(weapon) {
    this.name = weapon.name;
    this.attack_point = weapon.attack_point;
    this.effect = weapon.effect;
}

Weapon.prototype.get_name = function() {
    return this.name;
};

Weapon.prototype.get_effect = function() {
    return null;
};

Weapon.prototype.get_trigger_ratio = function() {
    return this.trigger_ratio;
};

Weapon.prototype.effect_is_triggered = function() {
    return Common.get_random_num() < this.get_trigger_ratio();
};

Weapon.prototype.get_effect = function() {
    if(this.effect_is_triggered()) {
        return this.effect;
    }
    return '';
};