"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatbot_1 = require("@twitchfy/chatbot");
exports.default = (0, chatbot_1.createEvent)({
    event: 'ChatBotReady',
    run: async (chatbot) => {
        console.log(`Chatbot is ready! Logged in as ${chatbot.user.username}!`);
    }
});
