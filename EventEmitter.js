const EventEmitter = (function () {
    var _o = {}
    return function EventEmitter () {
        if (!(this instanceof EventEmitter)) return new EventEmitter();
        function on(EventName, callback) {
            if (typeof EventName != 'string' || typeof callback !== 'function') throw new Error('You can\'t do that.');
            if (Array.isArray(_o[EventName])) {
                _o[EventName].push(callback);
                return;
            }
            _o[EventName] = [callback];
        }

        function off (EventName, callback) {
            if (typeof EventName != 'string') throw new Error('You can\'t do that.');
            if (callback) {
                _o[EventName] = _o[EventName].filter(item => item.callback !== callback);
            }
            _o[EventName] = undefined;
        }

        function emit(EventName, ...args) {
            if (typeof EventName != 'string') throw new Error('You can\'t do that.');
            var res = args[args.length - 1];
            if (typeof res === 'function') {
                args.pop();
            }
            try {
                _o[EventName].forEach(callback => {
                    callback(...args, res);
                });
            } catch (err) {}
        }    
        this.on = on;
        this.off = off;
        this.emit = emit;
    }
}())

module.exports = EventEmitter;
