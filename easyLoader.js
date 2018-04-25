!(function(moduleArr) {
    var rootModule = {};
    function __require__(id) {
        if (!rootModule[id]) {
            var module = {};
            module.id = id;
            module.exports = {};
            moduleArr[id](module.exports, module, __require__);
            rootModule[id] = module;
            return module.exports;
        } else {
            return rootModule[id].exports;
        }
    }
    __require__(0);
})([
    function(exports, module, require) {
        var a = require(1);
        var b = require(2);
        console.log(a);
        console.log(b);
    },
    function(exports, module, require) {
        module.exports = 'ok';
    },
    function(exports, module, require) {
        exports.msg = 'ok';

    }
]);
