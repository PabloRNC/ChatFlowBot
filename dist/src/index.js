"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _mongoose = require("mongoose");
const _server = require("./server");
const _twitch = require("./twitch");
const _discord = require("./discord");
async function main() {
    await (0, _mongoose.connect)(process.env.MONGODB_URI);
    const server = await (0, _server.initServer)();
    const chatbot = await (0, _twitch.initChatBot)(server);
    await (0, _discord.initDiscordBot)(chatbot);
}
main();
