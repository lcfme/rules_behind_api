const qsParser = url => {
    var idx = url.indexOf('?');

    function clearStack() {
        var key = stack[0],
            value = stack[1];
        if (value === 'true') {
            value = true
        } else if (value === 'false') {
            value = false
        } else if (value === 'undefined') {
            value = undefined
        } else if (value === 'null') {
            value = null
        }
        o[key] = value;
        stack.length = 0;
    }
    while (idx > -1) {
        url = url.substr(idx + 1);
        idx = url.indexOf('?');
    }
    var i = 0,
        len = url.length,
        o = {},
        stack = [],
        status = 0; /* 状态校验 0: 键 1: 值 */
    while (i < len) {
        var ch = url[i];
        // 如果ch是&
        if (ch === '&') {
            clearStack();
            if (status === 0) {
                throw new Error('parse Error')
            }
            status = 0;
            i += 1;
            continue;
        }

        // ch是=
        if (ch === '=') {
            if (status === 1) {
                throw new Error('parse Error')
            }
            status = 1
            i += 1;
            continue;
        }

        // 解析一段字符串
        if (/[^=&]/.test(ch)) {
            var str = '';
            while (i < len && /[^=&]/.test(ch)) {
                str += ch;
                i += 1;
                ch = url[i];
            }
            stack.push(decodeURIComponent(str));
            continue;
        }

        throw new Error("Didn't match any rules");
    }
    clearStack();

    return o;
};