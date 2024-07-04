import { EventSubConnection } from "@twitchfy/chatbot";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TWITCH_CLIENT_ID: string;
            TWITCH_CLIENT_SECRET: string;
            TWITCH_WEBHOOK_SECRET: string;
            TWITCH_REDIRECT: string;
            TWITCH_URI: string;
            JWT_SECRET: string;
            MONGODB_URI: string;
            DISCORD_CLIENT_TOKEN: string;
        }
    }
}

declare module '@twitchfy/chatbot' {
    interface Options {
        connection: EventSubConnection.Webhook;
    }
}

export {};