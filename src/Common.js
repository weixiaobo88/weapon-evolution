module.exports = Common;

function Common() {

}

Common.inherit = function(child_class, super_class) {
    child_class.prototype = Object.create(super_class.prototype);
    child_class.prototype.constructor = super_class;
    child_class.prototype.parent = super_class.prototype;
};


Common.get_random_num = function() {
    return Math.random();
};

Common.is_empty = function(obj) {
    for(var item in obj) {
        if (obj.hasOwnProperty(item)) {
            return false;
        }
    }
    return true;
};

Common.clone = function(obj) {
    var new_obj = {};
    for (var item in obj) {
        new_obj[item] = obj[item];
    }

    return new_obj;
};

Common.has_same_value = function(old_obj, current_obj) {
    for (var item in old_obj) {
        if(current_obj[item] != old_obj[item]) {
            return false;
        }
    }
    return true;
};

