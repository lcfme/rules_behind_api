function StateMachine(fn) {
    function P(fn, { _value, _status = 'pending' } = {}) {
        var callback;
        function then(f) {
            callback = f;
            if (o._status === 'ok') {
                return P(null, { _value: callback(o._value), _status: 'ok' });
            } else {
                return o;
            }
        }
        function resolve(_v) {
            o._status = 'ok';
            o._value = _v;
            if (typeof callback === 'function') {
                return P(null, { _value: callback(o._value), _status: 'ok' });
            } else {
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
