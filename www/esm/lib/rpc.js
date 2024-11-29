/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./node_modules/mutable-promise/dist/index.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/mutable-promise/dist/index.esm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MutablePromise)\n/* harmony export */ });\nconst isPromiseLike = (value) => (value && \"object\" === typeof value && \"function\" === typeof value.then);\nclass MutablePromise extends Promise {\n    get status() { return this._s; }\n    get isPending() { return \"pending\" === this._s; }\n    get isFulfilled() { return \"fulfilled\" === this._s; }\n    get isRejected() { return \"rejected\" === this._s; }\n    get task() { return this._task; }\n    set task(value) {\n        //if(!this.isPending){ return; }\n        this._task = value;\n        let p;\n        if (isPromiseLike(value)) {\n            p = value;\n        }\n        else if (\"function\" === typeof value) {\n            p = new Promise(value);\n        }\n        if (p) {\n            (async () => {\n                try {\n                    const ret = await p;\n                    // make sure task not change\n                    if (value === this._task) {\n                        this.resolve(ret);\n                    }\n                }\n                catch (reason) {\n                    // make sure task not change\n                    if (value === this._task) {\n                        this.reject(reason);\n                    }\n                }\n            })();\n        }\n    }\n    get isEmpty() { return null == this._task; }\n    constructor(executor) {\n        let rs;\n        let rj;\n        const fn = (_rs, _rj) => { rs = _rs; rj = _rj; };\n        super(fn);\n        // walkaround babel which can not extend builtin class\n        // let _this = this;\n        // let then = new Promise(fn).then;\n        // this.then = function(){ then.apply(_this, arguments) } as any;\n        this._s = \"pending\";\n        this.resolve = (value) => {\n            if (this.isPending) {\n                if (isPromiseLike(value)) {\n                    this.task = value;\n                }\n                else {\n                    this._s = \"fulfilled\";\n                    rs(value);\n                }\n            }\n        };\n        this.reject = (reason) => {\n            if (this.isPending) {\n                this._s = \"rejected\";\n                rj(reason);\n            }\n        };\n        this.task = executor;\n    }\n}\n\n\n//# sourceMappingURL=index.mjs.map\n\n\n//# sourceURL=webpack://@hoge1e3/rpc/./node_modules/mutable-promise/dist/index.esm.js?");

/***/ }),

/***/ "./src/client.ts":
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Client: () => (/* binding */ Client)\n/* harmony export */ });\n/* harmony import */ var mutable_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mutable-promise */ \"./node_modules/mutable-promise/dist/index.esm.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n//const debug=console.log.bind(console);\nconst debug = ((...args) => false);\nclass Client {\n    get isReady() {\n        return this.readyPromise.isFulfilled;\n    }\n    constructor(target, channel = \"default\", origin = undefined, manualProbe = false) {\n        this.target = target;\n        this.channel = channel;\n        this.origin = origin;\n        this.manualProbe = manualProbe;\n        this.idhead = Math.random() + \"\";\n        this.idseq = 1;\n        this.queue = {};\n        this.readyPromise = new mutable_promise__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        const t = this;\n        t.idseq = 1;\n        const isWorker = target instanceof Worker;\n        const receiver = (isWorker ? target : globalThis);\n        receiver.addEventListener(\"message\", (e) => {\n            debug(\"CL-RECV\", e);\n            const d = e.data;\n            if (d.channel !== channel)\n                return;\n            if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.isReadyResponse)(d)) {\n                if (this.isReady)\n                    return;\n                debug(\"Worker is ready!\");\n                this.readyPromise.resolve(this.isReady);\n                return;\n            }\n            const q = t.queue[d.id];\n            if (!q) {\n                throw new Error(\"Missing id \" + d.id);\n            }\n            debug(\"ID delete\", d.id, t.queue);\n            delete t.queue[d.id];\n            if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.isSuccess)(d)) {\n                q.resolve(d.result);\n            }\n            else if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.isFail)(d)) {\n                q.reject(d.error);\n            }\n            else {\n                debug(\"Invalid\", d);\n                throw new Error(\"Invalid response code\");\n            }\n        });\n        if (!manualProbe)\n            this.waitReady();\n    }\n    requestReady() {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.target.postMessage((0,_types__WEBPACK_IMPORTED_MODULE_0__.readyRequest)(this.channel), this.origin);\n        });\n    }\n    waitReady() {\n        return __awaiter(this, void 0, void 0, function* () {\n            for (let i = 0; i < 30; i++) {\n                if (this.isReady)\n                    break;\n                this.requestReady();\n                yield new Promise((s) => setTimeout(s, 100));\n            }\n            if (!this.isReady) {\n                throw new Error(\"Timeout\");\n            }\n        });\n    }\n    run(path_1) {\n        return __awaiter(this, arguments, void 0, function* (path, params = {}) {\n            const t = this;\n            yield t.readyPromise;\n            const id = t.idhead + (t.idseq++);\n            t.queue[id] = new mutable_promise__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n            debug(\"ADD id\", id, t.queue);\n            t.target.postMessage({\n                id, path, params,\n                channel: t.channel,\n            }, t.origin);\n            return t.queue[id];\n        });\n    }\n}\n\n\n//# sourceURL=webpack://@hoge1e3/rpc/./src/client.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Client: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.Client),\n/* harmony export */   Server: () => (/* reexport safe */ _server__WEBPACK_IMPORTED_MODULE_1__.Server),\n/* harmony export */   proxy: () => (/* reexport module object */ _proxy__WEBPACK_IMPORTED_MODULE_2__)\n/* harmony export */ });\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ \"./src/client.ts\");\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ \"./src/server.ts\");\n/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./proxy */ \"./src/proxy.ts\");\n\n\n\n\n\n//# sourceURL=webpack://@hoge1e3/rpc/./src/index.ts?");

/***/ }),

/***/ "./src/proxy.ts":
/*!**********************!*\
  !*** ./src/proxy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   client: () => (/* binding */ client),\n/* harmony export */   server: () => (/* binding */ server)\n/* harmony export */ });\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ \"./src/client.ts\");\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ \"./src/server.ts\");\n\n\nfunction server(channel = \"default\", allowOrigin = [], methods) {\n    const s = new _server__WEBPACK_IMPORTED_MODULE_1__.Server(channel, allowOrigin);\n    for (let k in methods) {\n        s.serv(k, (params) => methods[k](...params.args));\n    }\n    return s;\n}\nfunction client(target, channel = \"default\", origin = undefined, manualProbe = false) {\n    const c = new _client__WEBPACK_IMPORTED_MODULE_0__.Client(target, channel, origin, manualProbe);\n    return new Proxy(c, {\n        get(target, p) {\n            if (typeof p === \"symbol\" || p === \"then\" || p === \"toString\") {\n                return Reflect.get(target, p);\n            }\n            return (...args) => c.run(p, { args });\n        }\n    });\n}\n\n\n//# sourceURL=webpack://@hoge1e3/rpc/./src/proxy.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Server: () => (/* binding */ Server)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n\n//const debug=console.log.bind(console);\nconst debug = ((...args) => false);\nclass Server {\n    constructor(\n    //public target: Messagable, \n    channel = \"default\", allowOrigin = []) {\n        this.channel = channel;\n        this.allowOrigin = allowOrigin;\n        this.isReady = false;\n        this.paths = {};\n        globalThis.addEventListener(\"message\", (e) => {\n            const d = e.data;\n            const id = d.id;\n            const respond = (m) => {\n                if (e.source) {\n                    // Iframe\n                    e.source.postMessage(m, {\n                        targetOrigin: e.origin,\n                    });\n                }\n                else {\n                    // Worker\n                    debug(\"Worker respond\", m);\n                    globalThis.postMessage(m);\n                }\n            };\n            const context = { id, channel };\n            debug(\"EVT\", e, d.channel, channel);\n            if (d.channel !== channel)\n                return;\n            if (e.origin && !allowOrigin.includes(e.origin)) {\n                console.error(\"Invalid origin\", e.origin);\n                sendError(new Error(`Invalid origin: ${e.origin}`));\n                return;\n            }\n            if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.isReadyRequest)(d)) {\n                debug(\"READY\", d);\n                respond({ id: \"READY\", channel, status: \"ready\" });\n                return;\n            }\n            if (!(0,_types__WEBPACK_IMPORTED_MODULE_0__.isRequest)(d))\n                throw new Error(\"Invalid message\");\n            try {\n                const f = this.paths[d.path];\n                if (!f)\n                    return sendError(new Error(\"No such method: \" + d.path));\n                Promise.resolve(f(d.params, context)).then((r) => {\n                    respond(Object.assign(Object.assign({}, context), { result: r, status: \"ok\" }));\n                }, sendError);\n            }\n            catch (ex) {\n                sendError(ex);\n            }\n            function sendError(_err) {\n                let err = Object.assign({ name: _err.name, message: _err.message, stack: _err.stack }, _err || {});\n                try {\n                    const j = JSON.stringify(err);\n                    err = JSON.parse(j);\n                }\n                catch (je) {\n                    err = err ? err.message || e + \"\" : \"unknown\";\n                    debug(\"rpc:service\", je, err);\n                }\n                respond(Object.assign(Object.assign({}, context), { error: err, status: \"error\" }));\n            }\n        });\n        this.ready();\n    }\n    install(path, func) {\n        this.paths[path] = func;\n    }\n    serv(path, func) {\n        this.install(path, func);\n    }\n    ready() {\n        this.isReady = true;\n    }\n}\n;\n\n\n//# sourceURL=webpack://@hoge1e3/rpc/./src/server.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isFail: () => (/* binding */ isFail),\n/* harmony export */   isReadyRequest: () => (/* binding */ isReadyRequest),\n/* harmony export */   isReadyResponse: () => (/* binding */ isReadyResponse),\n/* harmony export */   isRequest: () => (/* binding */ isRequest),\n/* harmony export */   isSuccess: () => (/* binding */ isSuccess),\n/* harmony export */   readyRequest: () => (/* binding */ readyRequest)\n/* harmony export */ });\nfunction isRequest(m) {\n    return m.path && m.params;\n}\nfunction isFail(m) {\n    return m.status === \"error\";\n}\nfunction isSuccess(m) {\n    return m.status === \"ok\";\n}\nfunction isReadyRequest(m) {\n    return m.id == \"READY\";\n}\nconst readyRequest = (channel) => ({ id: \"READY\", channel });\nfunction isReadyResponse(m) {\n    return m.id == \"READY\" && m.status === \"ready\";\n}\n\n\n//# sourceURL=webpack://@hoge1e3/rpc/./src/types.ts?");

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
/******/ var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ var __webpack_exports__Client = __webpack_exports__.Client;
/******/ var __webpack_exports__Server = __webpack_exports__.Server;
/******/ var __webpack_exports__proxy = __webpack_exports__.proxy;
/******/ export { __webpack_exports__Client as Client, __webpack_exports__Server as Server, __webpack_exports__proxy as proxy };
/******/ 
