"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _chatbot = require("@twitchfy/chatbot");
const _default = (0, _chatbot.createEvent)({
    event: 'ChatBotReady',
    run: async (chatbot)=>{
        console.log(`Chatbot is ready! Logged in as ${chatbot.user.username}!`);
    }
});
