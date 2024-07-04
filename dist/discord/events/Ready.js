"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
exports.default = (0, seyfert_1.createEvent)({
    data: {
        name: 'botReady'
    },
    run(..._args) {
        console.log('Bot is ready!');
    },
});
