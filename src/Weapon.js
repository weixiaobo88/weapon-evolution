module.exports = Weapon;

function Weapon(weapon) {
    this.name = weapon.name;
    this.attack_point = weapon.attack_point;
}

Weapon.prototype.get_name = function() {
    return this.name;
};

Weapon.prototype.get_effect_name = function() {
    return '';
};

Weapon.prototype.effect_is_triggered = function() {
    return false;
};

Weapon.prototype.effect_not_stop_attackee = function() {
    return true;
};

Weapon.prototype.effect_msg = function() {
    return '';
};
