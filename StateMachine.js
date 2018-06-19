function StateMachine(fn) {
    function P(fn, { _value, _status = 'pending' } = {}) {
        var callback;
        var temp = null;
        function then(f) {
            callback = f;
            if (o._status === 'ok') {
                return P(null, { _value: callback(o._value), _status: 'ok' });
            } else {
                temp = P(null, { _value: o._value, _status: 'pending' });
                return temp;
            }
        }
        function resolve(_v) {
            o._status = 'ok';
            o._value = _v;
            if (typeof callback === 'function') {
                temp._value = callback(temp._value);
                temp._status = 'ok';
            }
        }
        var o = {
            _value,
            _status,
            then
        };
        if (typeof fn === 'function') {
            fn(resolve);
        }
        return o;
    }
    return P(fn);
}
