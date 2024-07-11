import { config } from "dotenv";
import { Express } from "express";
import { Mongoose } from "mongoose";
import { HelixClient } from "@twitchfy/helix";
import { ChatBot, EventSubConnection } from "@twitchfy/chatbot";

import { TwitchCredentials } from "../models";
import { CustomMongoAdapter, getUserToken } from "./util";

config();

let chatbot: ChatBot<EventSubConnection.Webhook>;

export async function initChatBot(server: Express, db: Mongoose) {
    const userToken = await getUserToken();
    if (!userToken) throw new Error("No user token found");

    const {
        TWITCH_CLIENT_ID,
        TWITCH_CLIENT_SECRET,
        TWITCH_WEBHOOK_SECRET,
        TWITCH_URI,
    } = process.env;

    const appToken = await HelixClient.generateAppToken({
        clientId: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET,
    });

    chatbot = new ChatBot({
        clientId: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET,
        userToken,
        connectionType: EventSubConnection.Webhook,
        eventsub: {
            secret: TWITCH_WEBHOOK_SECRET,
            appToken,
            storage: { adapter: new CustomMongoAdapter(db) },
            baseURL: TWITCH_URI,
            server,
        },
        paths: {
            output: "dist/twitch",
            commands: "commands",
            events: "events",
        },
        helix: {
            callbacks: {
                async onUserTokenRefresh(oldToken, newToken) {
                    await TwitchCredentials.updateOne(
                        { userToken: oldToken.token },
                        { userToken: newToken.token }
                    );
                },
            },
        },
    });

    await chatbot.start();

    return chatbot;
}

export { chatbot };

