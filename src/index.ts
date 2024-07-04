import { connect } from "mongoose";
import { HelixClient } from "@twitchfy/helix";
import { initServer } from "./server";
import { initChatBot } from "./twitch";
import { initDiscordBot } from "./discord";
import { config } from "dotenv";
config();

async function main() {
    const db = await connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const server = await initServer();
    console.log("Server is running");
    const chatbot = await initChatBot(server, db);
    console.log("Twitch chatbot is running");
    await initDiscordBot(chatbot);
    console.log("Discord bot is running");
}

main();

export const helix = new HelixClient({ clientId: process.env.TWITCH_CLIENT_ID, clientSecret: process.env.TWITCH_CLIENT_SECRET });
