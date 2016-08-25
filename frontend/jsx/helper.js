/*******************************
 * Reusable Helper functions
 *******************************/

/**
 * Public function
 * Cross browser helper to addEventListener.
 * ref : https://gist.github.com/eduardocereto/955642
 * @param {HtmlElement} obj - The element to attach event to.
 * @param {string} eType - The event that will trigger the binded function.
 * @param {function(event)} callback - The callback function of the element.
 * @return {boolean} true if it was successfully binded.
 */
export function crossBrowserAddEventListener(obj, eType, callback) {
    let _output = false;
    if(obj.addEventListener) {
        // W3C approach
        obj.addEventListener(eType, callback, false);
        _output = true;
    } else if(obj.attachEvent) {
        // IE approach
        _output = obj.attachEvent('on' + eType, callback);
    } else {
        // Other browsers approach
        eType = 'on' + eType;
        if(typeof obj[eType] === 'function') {
            // Obj already has a function, let's wrap it with our own function
            // inside another function
            callback = ((f1,f2)=>{
                return ()=> {
                    f1.apply(this.arguments);
                    f2.apply(this.arguments);
                }
            }) (obj[evt], callback)
        }
        obj[eType] = callback;
        _output = true;
    }
    return _output;
}

/**
 * Public function
 * Cross browser helper to removeEventListener.
 * @param {HtmlElement} obj - The element to attach event to.
 * @param {string} eType - The event that will trigger the binded function.
 * @param {function(event)} callback - The callback function of the element.
 * @return {boolean} true if it was successfully binded.
 */
export function crossBrowserRemoveEventListener(obj, eType, callback) {
    let _output = false;
    if(obj.removeEventListener) {
        // W3C approach
        obj.removeEventListener(eType, callback, false);
        _output = true;
    } else if(obj.detachEvent) {
        // IE approach
        _output = obj.detachEvent('on' + eType, callback);
    }
    return _output;
}

/**
 * Public function
 * Determine whether the supplied string consists of alphabetical chars only.
 * @param {string} inputString - The supplied string.
 * @return {boolean} true the string consists of alphabetical chars only.
 */
export function isAlphabeticalOnly(inputString) {
    let array = inputString.match(/[^a-zA-Z]/g);
    if (array != null && array.length > 0) {
        return false;
    }
    return true;
}

/**
 * Public function
 * Determine whether the supplied string is a valid email format.
 * @param {string} inputString - The supplied string.
 * @return {boolean} true the string is a valid email format.
 */
export function isValidEmailFormat(inputString) {
    if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputString) ) {
      return true;
    }
    return false;
}
