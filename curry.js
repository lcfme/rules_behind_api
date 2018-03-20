function curry (fn, ...initArgs) {
    const len = fn.length, args = initArgs;
    function _forSaveArgs(args) {
        return function forAcceptArgs(...a) {
            const _args = [...args, ...a];
			
            if (_args.length >= len) {
                return fn(..._args);
            } else {
                return _forSaveArgs(_args);
            }
        }
    }
    return _forSaveArgs(args);
}