/** 1. 实现一个中间间队列 foo 参数时一组函数，
 * 其中每一个函数内都有store对象和next函数，
 * 每一个函数都可以改写store，并且调用next函数进入下一个函数。
 * --- 新东方面试
*/
function foo(...args) {
    var store = {}
    currentIndex = 0,
        currentFn = args[currentIndex];

    function next(_store) {
        store = _store;
        currentFn = args[++currentIndex];
        currentFn(store, next);
    }
    currentFn(store, next);
}

function f1(store, next) {
    console.log('1 --- push');
    next({ a: 1 });
    console.log('1 --- pop');
}


function f2(store, next) {
    console.log(store);
}

foo(f1, f2);

/**
 * 2. 两种方法实现斐波那契数列
 * --- DATA HUNTER
 */
// 循环
function fabi(n) {
    var last = 1;
    var next = 1;
    if (n < 2) {
        return last;
    }
    if (n < 3) {
        return next;
    }
    for (var i = 0; i < n - 2; i++) {
        var temp = next;
        next = last + next;
        last = temp;
    }
    return next;
}

/**
 * 递归
 * ---DATA HUNTER
 */

var fabi = (function () {
    var cache = {};
    return function foo(n) {
        if (n < 3) {
            return 1; // 1 1 2
        }
        if (cache[n]) {
            return cache[n];
        } else {
            var r = foo(n - 1) + foo(n - 2);
            cache[n] = r;
            return r;
        }
    }
})();

/**
 * 链表倒序
 * ---DATA HUNTER CTO
 */

var node1 = {
    data: 1,
}

var node2 = {
    data: 2,
}

var node3 = {
    data: 3,
}

node1.next = node2;
node2.next = node3;
node3.next = null;

function reverse(node) {
    if (node.next) {
        var nodenext = node.next;
        nodenext.before = node;
        reverse(nodenext);
    } else {
        node.before = null;
    }
}

/**
 * C语言实现
 * 
#include <stdio.h>
typedef struct node
{
    int data;
    struct node *next;
} NODE;
typedef struct nodep
{
    int data;
    struct nodep *next;
    struct nodep *before;
} NODEP;
void reverse(NODEP *nodep, NODE *node)
{
    if ((*node).next) {
        NODE nodenext = (*(*node).next);
        (*nodep).data = nodenext.data;
        (*nodep).next = (NODEP *) nodenext.next;
        (*nodep).before = (NODEP *) node;
        reverse(nodep->next, node->next);
    }
}
int main()
{
    NODE node1;
    NODE node2;
    NODE node3;
    node1.data = 1;
    node1.next = &node2;
    node2.data = 2;
    node2.next = &node3;
    node3.data = 3;
    node3.next = 0;
    NODEP nodep1;
    reverse(&nodep1, &node1);
}
 */



/**
 * 柯里化函数
 * --- 新东方
 */


function currify(fn, ctx) {
    var len = fn.length;
    function r(...argsForSave) {
        argsForSave = argsForSave || []
        return function (..._args) {
            _args = _args || [];
            var args = [...argsForSave, ..._args];
            console.log(args);
            if (args.length >= len) {
                return fn.call(ctx || null, ...args);
            }
            return r(...args);
        }
    }
    return r();
}

/**
 * bind实现
 * 新东方
 */

Function.prototype.bind = function (ctx) {
    var func = this;
    return function () {
        return func.apply(ctx, [].slice.call(arguments));
    }
}


/**
 * es6 reduce 用法 求和一个二维数组 其中一维数组也可能直接包含数据
 * datahunter
 */

var arr = [[1, 2], [3, 4], 5, 6];

function flattern(arr) {
    return arr.reduce((result, item) => {
        return Array.isArray(item) ? [...result, ...flattern(item)] : [...result, item];
    }, []);
}

flattern(arr).reduce((sum, item) => {
    return sum + item;
}, 0)


/**
 * 写一个分割字母和数字的 如 123ads456 -> [123, 'ads', 456] 正则表达式没意思
 * --- 新东方
 */


function foo(str) {
    str = str || '';
    var i = 0, ch, token = [];
    while (ch = str[i]) {
        if (/\d/.test(ch)) {
            var value = ''
            while (ch && /\d/.test(ch)) {
                value += ch;
                ch = str[++i];
            }
            token.push(value);
            continue;
        }
        if (/[^\d]/.test(ch)) {
            var value = '';
            while (ch && !/\d/.test(ch)) {
                value += ch;
                ch = str[++i];
            }
            token.push(value);
            continue;
        }
        throw new Error('eee');
    }
    return token;
}

/**
 * 如何判断是数组
 */

function judge(o) {
    return {
        is: function (type) {
            if (Object.prototype.toString.call(o) === '[object Null]' || Object.prototype.toString.call(o) === '[object Undefined]') {
                return Object.prototype.toString.call(o) === Object.prototype.toString.call(type);
            } else {
                return Object.getPrototypeOf(o) === type.prototype;
            }

        }
    }
}
function G () {
    
}

var g = new G();
judge(g).is(G);



judge([]).is('array');