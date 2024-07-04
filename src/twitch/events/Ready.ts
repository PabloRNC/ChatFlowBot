import { createEvent } from "@twitchfy/chatbot";

export default createEvent({
    event: 'ChatBotReady',
    run: async (chatbot) => {
        console.log(`Chatbot is ready! Logged in as ${chatbot.user.username}!`);
    }
})