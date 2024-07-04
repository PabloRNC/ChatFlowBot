"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChatBot = void 0;
const chatbot_1 = require("@twitchfy/chatbot");
const helix_1 = require("@twitchfy/helix");
const dotenv_1 = require("dotenv");
const util_1 = require("./util");
const models_1 = require("../models");
(0, dotenv_1.config)();
async function initChatBot(server, db) {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_WEBHOOK_SECRET, TWITCH_URI } = process.env;
    const userToken = await (0, util_1.getUserToken)();
    if (!userToken)
        throw new Error("No user token found");
    const appToken = await helix_1.HelixClient.generateAppToken({ clientId: TWITCH_CLIENT_ID, clientSecret: TWITCH_CLIENT_SECRET });
    const chatbot = new chatbot_1.ChatBot({
        clientId: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET,
        userToken,
        connectionType: chatbot_1.EventSubConnection.Webhook,
        eventsub: {
            secret: TWITCH_WEBHOOK_SECRET,
            appToken,
            storage: { adapter: new util_1.CustomMongoAdapter(db) },
            baseURL: TWITCH_URI,
            server
        },
        paths: {
            output: 'dist/twitch',
            commands: 'commands',
            events: 'events'
        },
        helix: {
            callbacks: {
                async onUserTokenRefresh(oldToken, newToken) {
                    await models_1.TwitchCredentials.updateOne({ userToken: oldToken.token }, { userToken: newToken.token });
                },
            }
        }
    });
    await chatbot.start();
    return chatbot;
}
exports.initChatBot = initChatBot;
