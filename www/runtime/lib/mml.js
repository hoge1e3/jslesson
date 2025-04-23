/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "../osccillator/js/src/index.js":
/*!**************************************!*\
  !*** ../osccillator/js/src/index.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bufferedWaveform: () => (/* binding */ bufferedWaveform),\n/* harmony export */   createBufferedWaveformNote: () => (/* binding */ createBufferedWaveformNote),\n/* harmony export */   createMuteNote: () => (/* binding */ createMuteNote),\n/* harmony export */   createNote: () => (/* binding */ createNote),\n/* harmony export */   createOscillatorNote: () => (/* binding */ createOscillatorNote),\n/* harmony export */   gainNodeOfEnvelope: () => (/* binding */ gainNodeOfEnvelope),\n/* harmony export */   joinSource: () => (/* binding */ joinSource),\n/* harmony export */   playbackRateOf: () => (/* binding */ playbackRateOf)\n/* harmony export */ });\nfunction gainNodeOfEnvelope(audioCtx, time, duration, vol, envelope) {\n    const gainNode = audioCtx.createGain();\n    const attackEnd = time + envelope.attack;\n    const decayEnd = attackEnd + envelope.decay;\n    gainNode.gain.setValueAtTime(0, time); // Start at 0 volume\n    gainNode.gain.linearRampToValueAtTime(vol, attackEnd); // Attack phase\n    gainNode.gain.linearRampToValueAtTime(vol * envelope.sustain, decayEnd); // Decay phase\n    gainNode.gain.setValueAtTime(vol * envelope.sustain, decayEnd); // Sustain phase\n    gainNode.gain.linearRampToValueAtTime(0, time + duration); // Release phase\n    return gainNode;\n}\nfunction joinSource(...sources) {\n    const duration = sources.reduce((prev, cur) => prev + cur.duration, 0);\n    return {\n        duration,\n        play(ctx, start = ctx.currentTime, dest = ctx.destination) {\n            const end = start + duration;\n            const playbacks = sources.reduce((pbs, src) => [\n                ...pbs,\n                src.play(ctx, pbs[pbs.length - 1]?.end || start, dest)\n            ], []);\n            return {\n                ctx, dest, start, end,\n                stop() {\n                    for (let p of playbacks)\n                        p.stop();\n                },\n                join(src) {\n                    return src.play(ctx, end, dest);\n                }\n            };\n        }\n    };\n}\nfunction createMuteNote(duration) {\n    return {\n        duration,\n        play(ctx, start = ctx.currentTime, dest = ctx.destination) {\n            return {\n                ctx, dest, start, end: start + duration,\n                stop() { },\n            };\n        }\n    };\n}\nfunction createNote(duration, freq, vol, waveform, envelope) {\n    if (typeof waveform === \"string\") {\n        return createOscillatorNote(duration, freq, vol, waveform, envelope);\n    }\n    else {\n        return createBufferedWaveformNote(duration, freq, vol, waveform, envelope);\n    }\n}\nfunction createOscillatorNote(duration, freq, vol, waveform, envelope) {\n    return {\n        duration,\n        play(ctx, start = ctx.currentTime, dest = ctx.destination) {\n            const oscillator = ctx.createOscillator();\n            const gainNode = gainNodeOfEnvelope(ctx, start, duration, vol, envelope);\n            oscillator.type = waveform; // type of wave\n            oscillator.frequency.setValueAtTime(freq, start); // frequency in hertz\n            oscillator.connect(gainNode);\n            gainNode.connect(dest);\n            const end = start + duration;\n            oscillator.start(start);\n            oscillator.stop(end);\n            return {\n                gainNode, oscillator,\n                ctx, dest, start, end,\n                stop() {\n                    gainNode.disconnect();\n                },\n            };\n        }\n    };\n}\nfunction bufferedWaveform(ctx, array, freqParam = { lambda: array.length }) {\n    // From sampled(Recorded) data\n    //  given: sampleRate, baseFreq \n    //  calculate: lambda = sampleRate / baseFreq\n    //  re-calculate: baseFreq = ctx.sampleRate / lambda \n    //                        (= orig_baseFreq * ctx.sampleRate / sampleRate )\n    // From generated data\n    //  given: lambda\n    //        (sampleRate=ctx.sampleRate)\n    //  calculate: baseFreq = sampleRate / lambda\n    const baseFreq = \"baseFreq\" in freqParam ? freqParam.baseFreq * ctx.sampleRate / freqParam.sampleRate : ctx.sampleRate / freqParam.lambda;\n    const buf = ctx.createBuffer(1, array.length, ctx.sampleRate);\n    const dstArray = buf.getChannelData(0);\n    let avr = 0;\n    for (let e of array) {\n        avr += e;\n    }\n    avr /= array.length;\n    for (let i = 0; i < dstArray.length; i++) {\n        dstArray[i] = array[i] - avr;\n    }\n    return {\n        buf, baseFreq,\n    };\n}\nfunction playbackRateOf(waveform, freq) {\n    return freq / waveform.baseFreq;\n}\nfunction createBufferedWaveformNote(duration, freq, vol, waveform, envelope) {\n    return {\n        duration,\n        play(ctx, start = ctx.currentTime, dest = ctx.destination) {\n            const oscillator = ctx.createBufferSource();\n            oscillator.buffer = waveform.buf;\n            oscillator.playbackRate.setValueAtTime(playbackRateOf(waveform, freq), start);\n            oscillator.loop = true;\n            const gainNode = gainNodeOfEnvelope(ctx, start, duration, vol, envelope);\n            oscillator.connect(gainNode);\n            gainNode.connect(dest);\n            const end = start + duration;\n            oscillator.start(start);\n            oscillator.stop(end);\n            return {\n                gainNode, oscillator,\n                ctx, dest, start, end,\n                stop() {\n                    gainNode.disconnect();\n                },\n            };\n        }\n    };\n}\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://@hoge1e3/mml/../osccillator/js/src/index.js?");

/***/ }),

/***/ "./js/src/mml.js":
/*!***********************!*\
  !*** ./js/src/mml.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MelodyParser: () => (/* binding */ MelodyParser),\n/* harmony export */   Parser: () => (/* binding */ Parser),\n/* harmony export */   japaneseLiteralSet: () => (/* binding */ japaneseLiteralSet),\n/* harmony export */   standardLiteralSet: () => (/* binding */ standardLiteralSet),\n/* harmony export */   toSource: () => (/* binding */ toSource)\n/* harmony export */ });\n/* harmony import */ var _hoge1e3_oscillator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hoge1e3/oscillator */ \"../osccillator/js/src/index.js\");\n\nconst standardLiteralSet = {\n    scales: [\"c\", \"d\", \"e\", \"f\", \"g\", \"a\", \"b\"],\n    rest: \"r\",\n    octave: { up: \">\", down: \"<\" },\n    length: \"l\",\n    concatLength: \"&\",\n    longSyllable: \"^\",\n    sharp: /^[#+]/, flat: \"-\",\n    halfSyllable: \".\",\n};\nconst japaneseLiteralSet = {\n    scales: [\"ド\", \"レ\", \"ミ\", \"ファ\", \"ソ\", \"ラ\", \"シ\"],\n    concatLength: \"&\",\n    rest: \"・\",\n    octave: { up: /^[↑^]/, down: /^[↓_＿]/ },\n    length: \"l\",\n    longSyllable: /^[ー〜]/,\n    sharp: /^[#＃]/, flat: \"♭\",\n    halfSyllable: /^[．.]/,\n};\nconst scaleOffset = [0, 2, 4, 5, 7, 9, 11];\nfunction nl(n, d) { return { n, d }; }\nfunction gcd(a, b) {\n    return b === 0 ? a : gcd(b, a % b);\n}\nfunction lcm(a, b) {\n    return (a * b) / gcd(a, b);\n}\nfunction addNoteLength(a, b) {\n    const commonDenominator = lcm(a.d, b.d);\n    const numeratorA = a.n * (commonDenominator / a.d);\n    const numeratorB = b.n * (commonDenominator / b.d);\n    const resultNumerator = numeratorA + numeratorB;\n    const divisor = gcd(resultNumerator, commonDenominator);\n    return {\n        n: resultNumerator / divisor,\n        d: commonDenominator / divisor,\n    };\n}\nclass Parser {\n    literals;\n    mml;\n    i = 0;\n    constructor(literals, mml) {\n        this.literals = literals;\n        this.mml = mml;\n    }\n    eos() {\n        return this.i >= this.mml.length;\n    }\n    reg(p) {\n        const looking = this.mml.substring(this.i);\n        const m = p.exec(looking);\n        if (m) {\n            this.i += m[0].length;\n            return m;\n        }\n    }\n    str(p) {\n        const looking = this.mml.substring(this.i);\n        if (looking.startsWith(p)) {\n            this.i += p.length;\n            const groups = [p];\n            return Object.assign(groups, { groups, index: 0, input: looking });\n        }\n    }\n    read(p) {\n        this.reg(/^\\s*/);\n        if (typeof p === \"string\")\n            return this.str(p);\n        return this.reg(p);\n    }\n    parseLen(def) {\n        const literals = this.literals;\n        let length = def;\n        let lengthA = nl(0, 1);\n        while (true) {\n            const lennum = this.read(/^[0-9]+/);\n            if (!lennum)\n                break;\n            lengthA = addNoteLength(lengthA, nl(1, parseInt(lennum[0])));\n            const and = this.read(literals.concatLength);\n            if (!and)\n                break;\n        }\n        if (lengthA.n > 0)\n            length = lengthA;\n        let lengthS = length;\n        while (true) {\n            const longs = this.read(literals.longSyllable);\n            if (longs) {\n                length = addNoteLength(length, lengthS);\n                continue;\n            }\n            const halfs = this.read(literals.halfSyllable);\n            if (halfs) {\n                length = addNoteLength(length, nl(lengthS.n, lengthS.d * 2));\n                continue;\n            }\n            break;\n        }\n        return length;\n    }\n}\nclass MelodyParser extends Parser {\n    state = {\n        length: nl(1, 4), octave: 4,\n    };\n    constructor(literals, mml) {\n        super(literals, mml);\n    }\n    parse() {\n        let result = [];\n        const literals = this.literals;\n        const state = this.state;\n        const scls = literals.scales;\n        const read = this.read.bind(this);\n        const parseLen = this.parseLen.bind(this);\n        while (!this.eos()) {\n            let pi = this.i;\n            for (let j = 0; j < scls.length; j++) {\n                if (!read(scls[j]))\n                    continue;\n                let scale = scaleOffset[j] + (state.octave - 1) * 12;\n                while (true) {\n                    if (read(literals.sharp)) {\n                        scale++;\n                    }\n                    else if (read(literals.flat)) {\n                        scale--;\n                    }\n                    else\n                        break;\n                }\n                let length = parseLen(state.length);\n                result.push({ scale, length });\n                break;\n            }\n            if (read(literals.rest)) {\n                let length = parseLen(state.length);\n                result.push({ scale: null, length });\n            }\n            else if (read(literals.length)) {\n                const deflen = parseLen(state.length);\n                state.length = deflen;\n            }\n            else if (read(literals.octave.up)) {\n                state.octave++;\n            }\n            else if (read(literals.octave.down)) {\n                state.octave--;\n            }\n            if (pi == this.i)\n                this.i++;\n        }\n        return result;\n    }\n}\nfunction toSource(m, tempo) {\n    // 0 = o1c\n    // 12 = o2c\n    // 24 = o3c\n    // 36 = o4c\n    // 48 = o5c\n    // o4a = 48-3 = 45 = 440Hz\n    const toscl = (scale) => 440 * Math.pow(2, (scale - 45) / 12);\n    // t120 = l2 = 1sec\n    // t240 = l1 = 1sec\n    const todur = (len) => (len.n) / (len.d) * 240 / tempo;\n    const notes = [];\n    for (let note of m) {\n        if (note.scale == null) {\n            notes.push((0,_hoge1e3_oscillator__WEBPACK_IMPORTED_MODULE_0__.createMuteNote)(todur(note.length)));\n            continue;\n        }\n        notes.push((0,_hoge1e3_oscillator__WEBPACK_IMPORTED_MODULE_0__.createNote)(todur(note.length), toscl(note.scale), 0.5, \"square\", {\n            attack: 0, // time in seconds to reach max volume\n            decay: 0.1, // time in seconds to reach sustain level\n            sustain: 0.5, // volume level during sustain (0 to 1)\n            release: 0.1, // time in seconds to fade out\n        }));\n    }\n    return (0,_hoge1e3_oscillator__WEBPACK_IMPORTED_MODULE_0__.joinSource)(...notes);\n}\n//# sourceMappingURL=mml.js.map\n\n//# sourceURL=webpack://@hoge1e3/mml/./js/src/mml.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./js/src/mml.js");
/******/ var __webpack_exports__MelodyParser = __webpack_exports__.MelodyParser
/******/ var __webpack_exports__Parser = __webpack_exports__.Parser
/******/ var __webpack_exports__japaneseLiteralSet = __webpack_exports__.japaneseLiteralSet
/******/ var __webpack_exports__standardLiteralSet = __webpack_exports__.standardLiteralSet
/******/ var __webpack_exports__toSource = __webpack_exports__.toSource
/******/ export { __webpack_exports__MelodyParser as MelodyParser, __webpack_exports__Parser as Parser, __webpack_exports__japaneseLiteralSet as japaneseLiteralSet, __webpack_exports__standardLiteralSet as standardLiteralSet, __webpack_exports__toSource as toSource };
/******/ 
