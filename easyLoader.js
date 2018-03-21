(function(moduleArr) {
    var rootModule = {};
    function Loader (moduleId = 0) {
        var o = {
            exports: {},
        };
        moduleArr[moduleId](o.exports, o, Loader);
        rootModule[moduleId] = o;
        return o.exports;
    }
    Loader();
})([
    function (exports, module, require) {
        console.log(0);
        var a = require(1);
        console.log(a, 'bingo');
    },
    function (exports, module, require) {
        console.log(1);
        exports.k = 1;
    }
]);