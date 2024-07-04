"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helix = void 0;
const mongoose_1 = require("mongoose");
const helix_1 = require("@twitchfy/helix");
const server_1 = require("./server");
const twitch_1 = require("./twitch");
const discord_1 = require("./discord");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function main() {
    const db = await (0, mongoose_1.connect)(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const server = await (0, server_1.initServer)();
    console.log("Server is running");
    const chatbot = await (0, twitch_1.initChatBot)(server, db);
    console.log("Twitch chatbot is running");
    await (0, discord_1.initDiscordBot)(chatbot);
    console.log("Discord bot is running");
}
main();
exports.helix = new helix_1.HelixClient({ clientId: process.env.TWITCH_CLIENT_ID, clientSecret: process.env.TWITCH_CLIENT_SECRET });
