import { EventSubConnection } from "@twitchfy/chatbot";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_CLIENT_TOKEN: string;
            JWT_SECRET: string;
            MONGODB_URI: string;
            TWITCH_CLIENT_ID: string;
            TWITCH_CLIENT_SECRET: string;
            TWITCH_REDIRECT: string;
            TWITCH_URI: string;
            TWITCH_WEBHOOK_SECRET: string;
        }
    }
}

declare module "@twitchfy/chatbot" {
    interface Options {
        connection: EventSubConnection.Webhook;
    }
}

export {};
