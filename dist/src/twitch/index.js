"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "initChatBot", {
    enumerable: true,
    get: function() {
        return initChatBot;
    }
});
const _chatbot = require("@twitchfy/chatbot");
const _helix = require("@twitchfy/helix");
const _eventsub = require("@twitchfy/eventsub");
const _dotenv = require("dotenv");
const _util = require("./util");
(0, _dotenv.config)();
async function initChatBot(server) {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_WEBHOOK_SECRET, TWITCH_URI } = process.env;
    const userToken = await (0, _util.getUserToken)();
    if (!userToken) throw new Error("No user token found");
    const appToken = await _helix.HelixClient.generateAppToken({
        clientId: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET
    });
    const chatbot = new _chatbot.ChatBot({
        clientId: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET,
        userToken,
        connectionType: _chatbot.EventSubConnection.Webhook,
        eventsub: {
            secret: TWITCH_WEBHOOK_SECRET,
            appToken,
            storage: {
                adapter: new _eventsub.MongoAdapter()
            },
            baseURL: TWITCH_URI,
            server
        },
        paths: {
            output: 'dist/twitch',
            commands: 'commands',
            events: 'events'
        }
    });
    await chatbot.start();
    return chatbot;
}
