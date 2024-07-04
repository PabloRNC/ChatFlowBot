"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "initDiscordBot", {
    enumerable: true,
    get: function() {
        return initDiscordBot;
    }
});
const _seyfert = require("seyfert");
async function initDiscordBot(chatbot) {
    const client = new _seyfert.Client({
        context: ()=>chatbot
    });
    await client.start();
    return client;
}
