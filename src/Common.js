module.exports = Common;

function Common() {

}

Common.inherit = function(child_class, super_class) {
    child_class.prototype = Object.create(super_class.prototype);
    child_class.prototype.constructor = super_class;
    child_class.prototype.parent = super_class.prototype;
};
