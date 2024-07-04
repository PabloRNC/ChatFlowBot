"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "initServer", {
    enumerable: true,
    get: function() {
        return initServer;
    }
});
const _express = _interop_require_default(require("express"));
const _localtunnel = _interop_require_default(require("localtunnel"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function initServer() {
    const app = (0, _express.default)();
    app.get('/', (_req, res)=>{
        res.send('Hello World!');
    });
    app.listen(8080);
    await (0, _localtunnel.default)({
        port: 8080,
        subdomain: 'chatflowbot'
    });
    return app;
}
