function StateMachine(fn) {
    function P (fn, {_value, _status = 'pending'} = {}) {
        var callback;
        function then (f) {
            callback = f;
            if (o._status === 'ok') {
                return P(null, {_value: callback(o._value), _status: 'ok'});
            } else {
                return o;
            }
        }
        function resolve(_v) {
            o._status = 'ok';
            if (typeof callback === 'function') {
                o._value = callback(_v);
            } else {
                o._value = _v;
            }
        }
        var o = {
            _value,
            _status,
            then
        }
        if (typeof fn === 'function') {
            fn(resolve);
        }
        return o;
    }
    return P(fn);
}

