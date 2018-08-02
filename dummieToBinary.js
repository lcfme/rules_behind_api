function toBinaryOnlyInt(int) {
    int = parseInt(int, 10);
    if (isNaN(int)) throw new Error('Invalid int number');
    var stack = [0], getStackLength = function() { return stack.length }, currentIdx;
    while (int--) {
        currentIdx = getStackLength();
        while (currentIdx--) {
            if (stack[currentIdx] === 0) {
                ++stack[currentIdx];
                break;
            }  
            stack[currentIdx] = 0;
            if (currentIdx === 0) {
                stack.unshift(1);
            }
        }
    }
    return stack;
};
