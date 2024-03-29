/* global global */
(function () {
    var _global=(typeof window!=="undefined" ? window : global);
var utils = (function() {
    var exports = {};

    var ASCII = {
        a: 'a'.charCodeAt(),
        f: 'f'.charCodeAt(),
        A: 'A'.charCodeAt(),
        F: 'F'.charCodeAt(),
        0: '0'.charCodeAt(),
        8: '8'.charCodeAt(),
        9: '9'.charCodeAt(),
    };

    exports.hex2int = function(str) {
        var ret = 0,
            digit = 0;
        str = str.replace(/^[0O][Xx]/, '');

        for (var i = str.length - 1; i >= 0; i--) {
            var num = intAtHex(str[i], digit++);
            if (num !== null) {
                ret += num;
            } else {
                throw new Error('Invalid hex ' + str);
            }
        }

        return ret;
    };

    var intAtHex = function(c, digit) {
        var ret = null;
        var ascii = c.charCodeAt();

        if (ASCII.a <= ascii && ascii <= ASCII.f) {
            ret = ascii - ASCII.a + 10;
        } else if (ASCII.A <= ascii && ascii <= ASCII.F) {
            ret = ascii - ASCII.A + 10;
        } else if (ASCII[0] <= ascii && ascii <= ASCII[9]) {
            ret = ascii - ASCII[0];
        } else {
            throw new Error('Invalid ascii [' + c + ']');
        }

        while (digit--) {
            ret *= 16;
        }
        return ret;
    };

    exports.octal2int = function(str) {
        str = str.replace(/^0/, '');
        var ret = 0,
            digit = 0;

        for (var i = str.length - 1; i >= 0; i--) {
            var num = intAtOctal(str[i], digit++);
            if (num !== null) {
                ret += num;
            } else {
                throw new Error('Invalid octal ' + str);
            }
        }

        return ret;
    };

    var intAtOctal = function(c, digit) {
        var num = null;
        var ascii = c.charCodeAt();

        if (ascii >= ASCII[0] && ascii <= ASCII[8]) {
            num = ascii - ASCII[0];
        } else {
            throw new Error('Invalid char to Octal [' + c + ']');
        }

        while (digit--) {
            num *= 8;
        }
        return num;
    };

    exports.regslashes = function(pre) {
        return pre.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\|/g, '\\|');
    };

    exports.stripslashes = function(str) {
        return str.replace(/\\([\sA-Za-z\\]|[0-7]{1,3})/g, function(str, c) {
            switch (c) {
                case '\\':
                    return '\\';
                case '0':
                    return '\u0000';
                default:
                    if (/^\w$/.test(c)) {
                        return getSpecialChar(c);
                    } else if (/^\s$/.test(c)) {
                        return c;
                    } else if (/([0-7]{1,3})/.test(c)) {
                        return getASCIIChar(c);
                    }
                    return str;
            }
        });
    };

    var getASCIIChar = function(str) {
        var num = exports.octal2int(str);
        return String.fromCharCode(num);
    };

    var getSpecialChar = function(letter) {
        switch (letter.toLowerCase()) {
            case 'b':
                return '\b';
            case 'f':
                return '\f';
            case 'n':
                return '\n';
            case 'r':
                return '\r';
            case 't':
                return '\t';
            case 'v':
                return '\v';
            default:
                return letter;
        }
    };
    return exports;
})();
//---------scanf
var scanf = (function() {
    var exports = {};
    var input = '';

    function sscanfJS(str, format) {
    	input = str;
        var re = new RegExp('[^%]*%[0-9]*[A-Za-z][^%]*', 'g');
        var selector = format.match(re);
        var result=[];
        selector.forEach(function(val) {
            result.push(dealType(val));
        });
        return result;
    }
    exports.sscanfJS=sscanfJS;

    var getInput = function(pre, next, match, type) {
        var result;
        if (!input.length || input === '\r') {
            return null;
        }

        // match format
        var replace = '(' + match + ')';
        var tmp = input;

        // while scan string, replace before and after
        if (type === 'STR' && next.trim().length > 0) {
            var before_macth = utils.regslashes(pre);
            var after_match = utils.regslashes(next) + '[\\w\\W]*';
            if (before_macth.length) {
                tmp = tmp.replace(new RegExp(before_macth), '');
            }
            tmp = tmp.replace(new RegExp(after_match), '');
        } else {
            replace = utils.regslashes(pre) + replace;
        }

        var m = tmp.match(new RegExp(replace));

        if (!m) {
            // todo strip match
            return null;
        }
        result = m[1];

        // strip match content
        input = input.substr(input.indexOf(result)).replace(result, '').replace(next, '');

        return result;
    };

    var getChar = function(pre, next) {
        var text = getInput(pre, next, '.');
        if (!text) {
            return null;
        }
        return text.charCodeAt(0);
    };
    var getInteger = function(pre, next) {
        var text = getInput(pre, next, '[-]?[A-Za-z0-9]+');
        if (!text) {
            return null;
        } else if (text[0] == '0') {
            if (text[1] == 'x' || text[1] == 'X') {
                return utils.hex2int(text);
            } else {
                return utils.octal2int(text);
            }
        } else {
            return parseInt(text);
        }
    };

    var getFloat = function(pre, next) {
        var text = getInput(pre, next, '[-]?[0-9]+[\.]?[0-9]*');
        return parseFloat(text);
    };

    var getHex = function(pre, next) {
        var text = getInput(pre, next, '[A-Za-z0-9]+');
        return utils.hex2int(text);
    };

    var getOctal = function(pre, next) {
        var text = getInput(pre, next, '[A-Za-z0-9]+');
        return utils.octal2int(text);
    };

    var getString = function(pre, next) {
        var text = getInput(pre, next, '\\S+', 'STR');
        //var text = getInput(pre, next, '([\\w\\]=-]|\\S[^\\][^\\ ])+(\\\\[\\w\\ ][\\w\\:]*)*', 'STR');
        if (/\\/.test(text))
            text = utils.stripslashes(text);
        return text;
    };

    var getLine = function(pre, next) {
        var text = getInput(pre, next, '[^\n\r]*');
        if (/\\/.test(text))
            text = utils.stripslashes(text);
        return text;
    };

    var dealType = function(format) {
        var ret;
        var res = format.match(/%([0-9]*)([A-Za-z]+)/);
        var res2 = format.match(/[^%]*/);
        if (!res) {
            return null;
        }

        var type = "%"+res[2];//res[0];
        var opt= res[1];
        var pre = !!res2 ? res2[0] : null;
        var next = format.substr(format.indexOf(type) + type.length);
        //console.log("dealType",type,opt);
        switch (type) {
            case '%d':
            case '%ld':
            case '%llu':
            case '%lu':
            case '%u':
                ret = getInteger(pre, next);
                break;
            case '%c': // TODO getChar
                ret = getChar(pre, next);
                break;
            case '%s':
                ret = getString(pre, next);
                if (opt.length>0) ret=ret.substring(0,opt-0);
                break;
            case '%S':
                ret = getLine(pre, next);
                break;
            case '%X':
            case '%x':
                ret = getHex(pre, next);
                break;
            case '%O':
            case '%o':
                ret = getOctal(pre, next);
                break;
            case '%f':
                ret = getFloat(pre, next);
                break;

            default:
                throw new Error('Unknown type "' + type + '"');
        }
        return ret;
    };
    return exports;
})();

_global.sscanfJS=scanf.sscanfJS;
})();
